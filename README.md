# LGC Report generator

### Description

Javascript source code for LGC Report generator, using React.js. The input is JSON file.

### Usage instructions

Notes -> supported measurement types are defined in constants -> each of them must have defined obs. columns for obs table + residuals and stationscolumns getters. Note that obs. columns need also a function compatible with the path structure in processing file.

-> Columns for instrument line are ready, but they are not accessible in the object, so needs to be added later.

-> How fixed arguments work
-> How link arguments & lookup table work, + instrument tooltip
-> How computations with ! work
-> lkp, abs
-> sizes, units

#### Single file compilation

In this part is explained, how to change (and how was changed) the react project from classical create-react-app template to template, which builds all the project into a single index.html.

Firstly, install rewired and webpack plugins as

    npm i react-app-rewired html-inline-script-webpack-plugin html-inline-css-webpack-plugin

then create **config-overrides.js** file in the project root folder.
The contents of the file are:

    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const HtmlInlineCssWebpackPlugin = require('html-inline-css-webpack-plugin').default;
    const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

    module.exports = {
    webpack: function (config, env) {
        //inline css and scripts right after chunk plugin.
        //chunk plugin will not be present for development build and thats ok.
        const inlineChunkHtmlPlugin = config.plugins.find(element => element.constructor.name === "InlineChunkHtmlPlugin");
        if (inlineChunkHtmlPlugin) {
        config.plugins.splice(config.plugins.indexOf(inlineChunkHtmlPlugin), 0,
            new HtmlInlineCssWebpackPlugin(),
            new HtmlInlineScriptPlugin()
        );
        }

        //Override HtmlWebpack plugin with preserving all options and modifying what we want
        const htmlWebpackPlugin = config.plugins.find(element => element.constructor.name === "HtmlWebpackPlugin");
        config.plugins.splice(config.plugins.indexOf(htmlWebpackPlugin), 1,
        new HtmlWebpackPlugin(
            {
            ...htmlWebpackPlugin.userOptions,
            inject: 'body'
            }
        )
        );

        return config;
    }
    }

Lastly, in the **package.json** file in "scripts" part replace _react-scripts_ in _build:react-scripts build_ line with _react-app-rewired_.

Then by simply calling

    npm run build

you will obtain self standing **index.html** file in the build/ folder.

### Roadmap

Header

- ~~! add the contents of the collapsible header part, and call the section metadata~~
- ~~ ! add the missing computable values to header ~~
- !!! sort header

Histograms:

- ~~CTRL + CLICK on cell -> go to the first observations in input file (is useful mainly if there is only one obs in the cell)~~
- ~~! Normalize all residuals values by SIGMA (=RES/SIG col), and plot it in separate histogram~~
- ~~! Changing number of bins~~
- ~~! observation type and line number on normalized join histogram hover~~
- !! apriori sigma for the observation
- !!! gaussian curve -> the data are in res file, center of gaussian is result, and the span is in ECART-TYPE

Stations Table:

- ~~! Add support for measurement types~~
- ~~! Rename ~~

3d Point Table:

- ~~! take Sigma data from diagonal ~~
- ~~! 0 padding for columns (trailing zeros)~~
- ~~! export to csv perhaps~~
- ~~ ! mark columns by categories (vertical line)~~
- ~~! take sigmas from fCovarianceMatrixInRoot~~
- !! hidden columns with the value in subframe (add hidden 6 columns to 3D pts table (3x coords + 3x uncertainties from diagonal!))
- !!! leave empty cells if there is nothing - discuss with Guillaume since it depends if it is defined in FRAME (only CALA in root)
- ~~!!! copy from report to excel !~~

Observation Table:

- ~~! Add formatting - when there is no value, make the field gray~~
- ! display only some columns by default, the others will be turned on with switcehs (they need to agree on what is displayed, most of it should be available though)
- ~~! height and header data -> Tooltip ok, but with the link to LGC input file~~
- ! highlights -> RES/SIG over 3 should be highlighted
- ~~! alltogether PLRD3 and ANGLE/ZEND/DIST~~
- ~~! copy from cells problem (cannot copy it from clickable tooltip)~~
- ~~! residuals and sigma columns should be sortable by the absolute value - add column with abs values(Res/Sig)~~
- ~~ ! add column saying the frame where it was defined ~~
- !! build a list of togglable stations+line, that they can toggle (for all tables with stations)
- ~~!!! filter icon on the header (search field) (maybe add another header with filet icons)~~

Measurement statistics overview:

- ! filtering by units
- !! is any of (any of types - so that they can see either ANGL or ZEND) filtering ?

Frames:

- ~~! one table with all frames with their parameters~~
- ~~! tree diagram of frames with transformation information on edges~~
- ~~ ! tree plot collapsible ~~
- ~~ !TX calculated - it can be `FIXED` there, but even if the value is fixed, that value should be shown ~~
- ! tree plot line to jump to frame definition (link) from node
- ~~! resolve zooming~~
- ~~! table fixedTranfParams should be visible in table - color tx ty etc, + make sigmas no_value if it is fixed + legend for colors~~
- ~~! add line column into table (with link)~~

General stuff:

- ~~ ! add the column with index (row number) ~~
- ~~! navigation bar~~
- ~~ ! filter numerical values ~~
- ~~! links!!! All the links (like RADI)~~
- ~~! formatting~~
- ~~! add table resume de mesures~~
- ~~ ! put units everywhere it is possible ~~
- ~~! remove f from fTSTN everywhere possible on frontend~~
- ~~! add support for more types~~
- !! show how many lines are displayed

  - ~~PL3D~~
  - ~~ANGL~~
  - ~~ZEND~~
  - ~~DIST~~
  - ~~DHOR~~
  - ~~ORIE~~
  - ~~UVEC~~
  - ~~UVD~~
  - ~~DSPT~~
  - ~~DLEV~~
  - ~~ECHO~~
  - ~~INCLY~~
  - ~~ECWS~~
  - ~~ECWI~~
  - ~~DVER~~
  - ~~RADI~~
  - ~~OBSXYZ~~

- ~~!! reorder~~
- !! ASK users if they want translated names of columns or the ids from input file (TCSE vs target centering sigma)

3D part

- ! make sure X and Y are linked on 3d Plot, not Z

- ! 2D plot (views per axis)
- ! tooltip: they don't care about xyz, they care about name
- ! highlight all the point lines measuring the point on hover
- !! error ellipsoid of confidence
- !!! maybe counter of observations per point like SurveyPad to tooltip (or hue)
- !!! color code per type (DIST, TSTN, PLR3D), if we have fully constrained put the solid color, if not put the dashed (maybe circle if sitance, horizontal angle triangle, etc. )
- !!! DX DY DZ, put it in the general 3D plot, add magnification factor since it might be not visible
- !!! Should all graphic stuff be in QGis or in LGC Report?
