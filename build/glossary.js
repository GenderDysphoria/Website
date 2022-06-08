/*****
 * DOCUMENTATION
 * 
 ******/

const { resolve, ROOT, TYPE } = require('./resolve');
const { siteInfo }  = require(resolve('package.json'));
const assert = require('assert');
const path = require('path');
const fsp = require('node:fs/promises');
const fs = require('fs-extra');
const glob = require('./lib/glob');
const log = require('fancy-log');
const Files = require('./files');
const Promise = require('bluebird');
const i18n = require('./lang');

// TODO: change structure for the module to hold everything
// TODO: change structure to separate meaning from words
/***
 * {
 *   'words': {
 *		'transman': {
 * 			'meaning': 'transman',
 * 			'class': 'noun',
 * 			'relation': '', // main form uses an empty string
 * 			'show': true, // shows in the glossary entry for the main form
 * 			'own_entry': true,
 * 			'auto_gloss': true,
 * 		}, 
 * 		'transmen': {
 * 			'meaning': 'transman',
 * 			'class': 'noun',
 * 			'relation': 'plural',
 * 			'show': true,
 * 			'own_entry': false,
 * 			'auto_gloss': true,
 * 		}, ...
 * 		'GLAAD': {
 * 			'ruby': '/ɡlæd/',
 * 			'auto_gloss': true,
 * 		},
 *   },
 * 	'meanings': {
 * 		'transman': {
 * 			'title': 'trans·man',
 * 			'short': 'An AFAB person who identifies as a man.',
 * 			'long': 'A person who was "born as a woman" but "became a man".'
 * 		}, ...
 * 	}
 * }
 */

async function loadGlossaries() {
	log('loading glossaries');
	const filepaths = await glob('public/**/_glossary.js', { cwd: ROOT, nodir: true });

	const output = {};
	for (const filepath of filepaths) {
		// Load public/**/_glossary.js files
		const src_gloss = require(path.join('..', filepath));
		const lang = path.basename(path.dirname(filepath));
		
		const terms = [];
		const terms_map = new Map();
		const entries = Object.keys(src_gloss.entries).sort();

		// Process each entry
		for (const entry_name of entries) {
			// Sanity check
			if (terms_map.has(entry_name)) {
				throw Exception('conflict of definitions for term: '+entry_name);
			}

			// Normalize the entry
			const src_entry = src_gloss.entries[entry_name];
			const entry = {
				main_form: entry_name,
				ruby: src_entry.ruby || undefined,
				short: src_entry.short || undefined,
				long: src_entry.long || undefined,
				pronunciations: src_entry.pronunciations || [],
				variants: src_entry.variants || [],
				renderAs: src_entry.renderAs || {},
				pronunciations_to_include_in_short_form: src_entry.pronunciations_to_include_in_short_form || 0,
			};
			// Add the entry itself to our map and the enrty name to our lists
			terms_map.set(entry_name, entry);
			terms.push(entry_name);

			// Process the term variants
			for (const variant_name of entry.variants) {
				// Sanity check
				if (terms_map.has(variant_name)) {
					throw Exception('conflict of definitions for term: '+variant_name);
				}

				// Add the entry itself to our map and the variant name to our list
				terms_map.set(variant_name, entry);
				terms.push(variant_name);
			}
		}
		
		// Finalize stuff
		const out_gloss = {
			'glossary_url': src_gloss.glossary_url,
			'lang': src_gloss.lang,
			'terms': terms, // sorted list of terms and variants
			'entries': entries, // sorted list of terms
			'map': terms_map, // map of terms and variants to definitions
			'set': new Set(terms) // set of terms and variants
		};
		output[lang] = out_gloss;
	}
	return output;
}
module.exports.loadGlossaries = loadGlossaries;

function autoInsertGloss(input, glossary) {
	// Split at word boundaries
	const words = input.split(/\b/g);
	
	// BUG: use case insensitive search
	// TODO: use a propper HTML parser

	// For each word, insert gloss markup if needed
	const in_comment = false;
	for (const key in words) {
		const i = Number(key);
		const word = words[i];
		if (in_comment === false && word.startsWith('<!--')) {
			in_comment = true;
		}
		if (in_comment === true && word.endsWith('-->')) {
			in_comment = false;
		}
		if (in_comment === false && glossary.set.has(word)) {
			words[i] = makeHTMLGloss(word, glossary, words[i+1]);
		}
	}

	// Concatenate out words back into a simple string
	return words.join('');
}
module.exports.autoInsertGloss = autoInsertGloss;

const punctuation_regexp = /[.,:;!@]/;

function isFirstPunctuation(span) {
	if (span === undefined) {
		return undefined;
	}
	return punctuation_regexp.test(span.charAt(0));
}

function makeHTMLGloss(term_key, glossary, next_word) {
	const entry = glossary.map.get(term_key);
	const term = entry.renderAs[term_key] || term_key;
	const has_glossary_definition = entry.short !== undefined || entry.long !== undefined;
	const term_core = has_glossary_definition ?
		`<dfn class="glossed-main"><a href="#">`+term+`</a></dfn>` : term;
	const gloss_url = glossary.glossary_url;
	const lang = glossary.lang;
	const read_more_txt = i18n(lang, 'GLOSSARY_READ_MORE');
	const go_to_txt = i18n(lang, 'GLOSSARY_GO_TO_GLOSSARY');

	var output = ``;
	if (has_glossary_definition) {
		output += `<span class="glossed-block">`;
	}

	// Make ruby (asiatic pronunciation annotation) markup
	if (entry.ruby !== undefined) {
		if (has_glossary_definition) {
			output += `<ruby class="glossed-ruby">`;
		} else {
			output += `<ruby>`;
		}
		output += term_core;
		output += `<rp>(</rp><rt>`;
		output += entry.ruby;
		output += `</rt><rp>)</rp>`
		output += `</ruby>`
	} else {
		output += term_core;
	}

	// Aggregate pronunciations
	var i = 0;
	var pronunciations = ``;
	if (entry.pronunciations_to_include_in_short_form > 0) {
		for (const pronunciation of entry.pronunciations) {
			if (i <= entry.pronunciations_to_include_in_short_form) {
				break;
			}

			if (pronunciation.IPA !== undefined) {
				if (pronunciations.length !== 0) {
					pronunciations += ', ';
				}
				pronunciations += pronunciation.IPA;
				i++;
			}
		}
		if (pronunciations.length !== 0) {
			pronunciations += `. `;
			pronunciations = `<span class="pronunciations">`+pronunciations+`</span>`;
		}
	}

	// Finalize short form
	const short_form = pronunciations+(entry.short||'');

	// Make tooltip print
	if (entry.short !== undefined && entry.show_in_print !== false) {
		assert(has_glossary_definition == true);
		output += `<span class="glossed-print">`;
		output += ` (`+short_form+`)`;
		if (isFirstPunctuation(next_word) === false) {
			output += ` `;
		}
		output += `</span>`;
	}

	// Make tooltip markup
	if (has_glossary_definition) {
		output += `<span class="glossed-tooltip">`;
		if (gloss_url !== undefined) {
			const entry_url = `${gloss_url}/#entry_${entry.main_form}`;
			if (short_form !== undefined) {
				output += short_form+` <a href="${entry_url}">${read_more_txt}</a>`;
			} else {
				output += `<a href="${entry_url}">${go_to_txt}</a>`;
			}
		}
		output += `</span>`;
	}

	if (has_glossary_definition) {
		output += `</span>`;
	}
	return output;
}

async function main() {
	const glossaries = await loadGlossaries();
	// log(makeHTMLGloss('AMAB', glossaries['en'], '.'));
	// log(makeHTMLGloss('AMAB', glossaries['en'], ' '));
	// log(makeHTMLGloss('LaTeX', glossaries['en']));
	// log(makeHTMLGloss('TeX', glossaries['en']));
	log(autoInsertGloss("GLAAD", glossaries['en']));
}

if (require.main === module) {
	main()
}