# LGC Report generator

### Description

Javascript source code for LGC Report generator, using React.js. The input is JSON file.

### Usage instructions


#### Users

All the links in the document work only when used INSIDE of SurveyPad and when CTRL+clicked. 

#### Maintainers

If you want to run the codebase, you need to run 

    npm install 

in the root of cloned git repository. Then you should create jsons_tmp folder in src/ file and put inside the .json file you want to display. 
Next step is to change the path on this line in App.jsx 

    const GMData = require("./jsons_tmp/NAME_OF_YOUR_JSON.json")

to correct name of your .json file. The last step is to run 

    npm start

and the website should be open on localhost:3000.

### Code structure and comments

File structre with dependencies is as follows:

![file structure](https://github.com/ondini/lgcreportgenerator/blob/master/fileStruct.png)

Notes for code usage and orientation:
- In columns definitions in data/columnsData are following keywords usable: 
    - **fixed** is used to specify name of column the true value of which defines the fixed state (name can also start by -, x, y, where - takes inverse value, x replaces the value with fixed keyword which is normally just grayed and y does inverted fixed keyword )
    - **link** denotes name of the column containing linked line number
    - **path** is just a path from root of measurement iteration to the desired data, but can be compined with other notations
        - **!** is denoting computation of value, used mainly when the value cant be found in .json, e.g. *path: "!distances/0/fValue!+!distancesResiduals/0/fValue!"*
        - **lkp:** in the beginning of the paths means, that the value from the path should be used as a key in the lookup table, which is part of the measurement object
        - **abs, sqrt** are supported in computations with **!**, too, e.g. *!abs(distancesResiduals/0/fValue)!*
    - **size** changes column size, it transales values *S*, *M*, *L*, e.t.c., into props of table column definition, when not provided, it is translated form units and without units, *S* i default
    - **unitConv** is a function for convertin the values before rendering, when not provided, translated from units
    - **units** is a name of units, these are rendered in column name and used for units conversion. If both units and some custom units conversion are provided, the **unitConv** argument has higher priority.
    - **tooltip** should be a functional component, which defines what is shown after clicking on value in the table

- Supported measurement types are defined in data/constants.jsx. To add new types, add the name there and each of them must have defined obs. columns for obs table in data/columnsData/obsTableCols.jsx. Note that for getting obs. columns and measurement statistics data, the types need also a function compatible with the path structure in data_processing/processing.jsx file. Some of the predefined ones such as getXObsRows

- Columns for instrument line are ready and commented out, since they are not accessible in the .json object, so needs to be added later.

### Build for Surveypad instructions

In App.jsx change

    const GMData = require(`./jsons_tmp/${dataFile}`);

to

    const GMData = require("./data/Placeholder.json");

and if you have any testing .json files in jsons_tmp file, remove them so that they are not compiled into the final file.
Then run

    npm run build

which should produce standalone file in build/ directory in the root of repository. The building process was already preconfigured for single file build. If you dont have it configured for some reason, follow the instructions in section **Single file compilation**.

### Single file compilation

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
