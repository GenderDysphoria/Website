const glob = require('./lib/glob');
const { ROOT, readFile, resolve } = require('./resolve');
const actions = require('./actions');
const File = require('./file');
const Promise = require('bluebird');
const { minify } = require('terser');
const rollup = require('./rollup');

module.exports = exports = async function scripts (prod) {
  const globalFiles = await glob('js/_*.js', { cwd: ROOT, nodir: true });
  globalFiles.unshift(
    require.resolve('jquery'),
    require.resolve('magnific-popup'),
    require.resolve('popper.js/dist/umd/popper.js'),
    require.resolve('bootstrap/js/dist/util.js'),
    require.resolve('bootstrap/js/dist/dropdown.js')
  );

  const globalScript = new ClientScript('js/global.js');
  await globalScript.concat(globalFiles, prod);

  const files = await Promise.map(glob('js/**/*.{js,jsx}', { cwd: ROOT, nodir: false }), async (filepath) => {
    const f = new ClientScript(filepath);
    if (f.preprocessed) return false;

    await f.load(prod);

    return f;
  }).filter(Boolean);

  const tasks = files.map((f) => f.tasks()).flat();

  tasks.push(...globalScript.tasks());
  return tasks;
};


class ClientScript extends File {

  _basename (file) {
    super._basename(file);

    this.rollup = false;
    if (file.name[0] === '$') {
      this.rollup = true;
      file.name = file.name.slice(1);
      file.base = file.base.slice(1);
    }
  }

  _dir (dir) {
    dir = dir.split('/');
    return dir;
  }

  async load (prod) {
    if (this.rollup) {
      this.content = await rollup(resolve(this.input), prod);
      return;
    }

    let contents = (await readFile(this.input).catch(() => '')).toString('utf8');
    if (prod) {
      const { code, error } = minify(contents, { output: { comments: false } });
      if (error) throw new Error(error);
      contents = code;
    }
    this.content = contents;
  }

  async concat (files, prod) {
    let contents = await Promise.map(files, readFile);
    contents = contents.join('\n\n');
    if (prod) {
      const { code, error } = await minify(contents, { output: { comments: false } });
      if (error) throw new Error(error);
      contents = code;
    }
    this.content = contents;
  }

  tasks () {
    if (this.preprocessed) return [];
    return [ {
      input: this.input,
      output: this.out,
      content: this.content,
      action: actions.write,
      nocache: true,
    } ];
  }

}
