# Chat Demo - Stage 1

## Setting up the project

For the first stage of the project, I'm just creating a bare-bones chat app using [socket.io](http://socket.io)
and [node.js](http://nodejs.org).

The app was developed on a machine running Ubuntu 14.04.

### Scaffolding
To set up the basic folder structure, I used the Yeoman node-generator npm package.

    mkdir stage_1
    yo node

I answered _yes_ to the Grunt and CLI options, which resulted in the following folder structure:

    ├── cli.js
    ├── Gruntfile.js
    ├── node_modules
    │   ├── grunt
    │   ├── grunt-contrib-jshint
    │   ├── grunt-contrib-nodeunit
    │   ├── grunt-contrib-watch
    │   ├── grunt-mocha-cli
    │   ├── jade
    │   ├── jshint-stylish
    │   ├── load-grunt-tasks
    │   └── time-grunt
    ├── package.json
    ├── README.md
    ├── test
    │   └── chat-demo_test.js

I'm not 100% thrilled with the folder structure that was generated, but it'll do. Perhaps the `express-generator`
template will be a better choice in future.

I normally like to structure my node apps as follows

folder       | types of files
------------ | --------------
node_modules | packages installed from npm
lib          | local node modules specific to this project
public       | static files intended for the client
views        | jade template files

So I added the missing folders before continuing.

### Bower

For client-side packages on the browser, [Bower](bower.io) is pretty handy. You use it pretty much the same way you
use NPM. For the first stage, I need the jquery and sprintf modules. To download and install them, you use

    bower init #create the bower.json file. I said 'no' to most options
    bower install --save jquery sprintf

Ok, snag. You'll notice that the modules are installed in the `bower_modules` directory. To put them in the `public/js/`
folder like I want you can create a `.bowerrc` file and put the following in it:

    {
      "directory": "public/js"
    }

Now the bower commands above will install the relevant libraries in the `public` folder.

**Note:** This is not what I probably want to do long term.

* The `public` folder will be served statically to browsers. There's a lot of other stuff in the `public` folder
  that I don't necessarily want people to see.
* The downloaded libraries aren't always minified. It would be nice to serve minified and/or aggregated .js files
  to browsers

I think a better strategy would be to have the modules be put in the default `bower_modules` directory, and then have
  a Grunt task collate and minify all the exported modules (and dependencies) and copy the result to `public/js/lib`.
  But let's leave that for another time.



