
# Codebase for the [Gender Dysphoria Bible](https://genderdysphoria.fyi).

Code for this site is distributed as MIT licensed.

Site content such as essays and photo materials are copyright Jocelyn Badgley & other contributors, and are licensed Creative Commons, Attribution-NonCommercial-ShareAlike (see [LICENSE.txt](LICENSE.txt)).

## How to use this repository

The GDB is a static content site generated using a custom built framework written in Node.js. The majority of the code that drives the build process sits in the `build` directory. This code is activated via a [GulpJS](https://gulpjs.com/) command interface.

You do not need to be able to execute the generation code in order to contribute content. All site content is stored in the `public` folder, with the GDB content under `public/gdb`. Changes to this content can be done to anyone who is experienced with HTML and git source control.

### Site Content

Page content is in [markdown](https://www.markdownguide.org/getting-started/) format, extended with a custom form of [Handlebars](https://handlebarsjs.com/guide/) for content injection. Sections wrapped `{!{like this}!}` are blocks of handlebar code that will be rendered as embedded HTML.

The beginning of each markdown file contains a [YAML](https://yaml.org/) formatted header block with metadata relevant to that file. The keywords at the start of each line are significant to the page generation process.

- `date`: This defines the creation date of the page and should never be changed unless a new page is created.
- `title`: This is the title of the page as it appears in the browser titlebar and when embedded on social media.
- `description`: This is the description of the page that appears when linked on social media.
- `preBody`: This defines the file to use for the block of text that appears at the top of each page in the GDB.
- `siblings`: This controls the navigation links that appear at the bottom of each page.
- `classes`: These are the css classes to apply to the page body for styling the page.
- `tweets`: This is a list of twitter urls or tweet ids that are embedded on the page. This is necessary for the engine to gather those tweets during the pre-render process so that they are available for embedding.

There are various content templates used throughout the pages that render common page elements, such as images and tweet blocks. These are imported using `{{import }}` handlebars blocks. Reference existing pages for examples of how to use these.

The `img` block can access any images stored either in the `_images` directory on the same level as the markdown file. They are made available by name, without the file extension. Any image prefixed with an underscore (such as `_titlecard.png`) is treated as a pre-made asset and will NOT be processed into different resolutions for site optimization.

**Site Styling**

All stylesheets for the site are built using SCSS and are are stored in the `scss` directory. Styling is broken into various subset files, organized by purpose. The site styling is built on top of Bootstrap 4 and makes used of its variables, mixins and components.

### Building the site with NodeJS

To execute this codebase you will need to have Node.js and npm installed on your computer and be familiar with the command line interface. Your computer will also need to have the `gd` and `graphicsmagick` libraries installed. See the build instructions below.

After cloning this repository to your computer you will need to run `npm install` in the project directory to install all of the dependency modules. If you haven't previously used gulp, you will also need to install the gulp CLI tools with `npm install --global gulp-cli`. Once this install is complete you can build the site by running the `gulp` command. This will compile all of the image assets, render the site stylesheets, and build the individual pages, before launching a local webserver to host the site for previewing the rendered content. Any changes made to the content while this server is running will trigger a recompile so that the page can simply be reloaded.

The command `gulp uat` will build the site as if it is prepared for deployment to the website. This performs extra optimizations to reduce the size of the site.

You can use `npm run build` to trigger the Gulp build process for production.

**Tweet Content**

The file `twitter-backup.json` contains the contents of all tweets used on the site. In order to add new tweets to the website (and be able to have them displayed), you will need to create a `twitter-config.json` file in the site root containing your own personal twitter API credentials.

The file is in this format:

```json
{
  "consumer_key": "YOUR",
  "consumer_secret": "TWITTER",
  "access_token_key": "CREDENTIALS",
  "access_token_secret": "HERE"
}
```

**Site Publishing**

Publishing the site content requires AWS credentials which are not stored in this repository. Attempts to use the `gulp publish` command will fail.

