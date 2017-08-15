# 🔨 Webpack_Template
This is full template for developing your code using Typescript and SASS.

## Version of the packages:
```JS
"devDependencies": {
    "cross-env": "^5.0.1",
    "css-loader": "^0.28.4",
    "extract-text-webpack-plugin": "^2.1.2",
    "file-loader": "^0.11.2",
    "html-webpack-plugin": "^2.28.0",
    "image-webpack-loader": "^3.3.1",
    "node-sass": "^4.5.3",
    "npm-run-all": "^4.0.2",
    "rimraf": "^2.6.1",
    "sass-loader": "^6.0.6",
    "style-loader": "^0.18.2",
    "ts-loader": "^2.1.0",
    "typescript": "^2.3.4",
    "webpack": "^2.6.1",
    "webpack-dev-server": "^2.4.5"
  }
```

## New Features
- V(1.2) Make enhancement by reconfigure weppack.config.js which detect if you use development mode or product mode.
- V(1.1) Make enhancement by adding npm-run-all package to run multiple tasks at a time.
- V(1.0) First initialize.

## Why we need Webpack

1. It is an easy way to manage, test, build, manified your code.
2. It has a powerfull tools to bundle and compile files like SASS/CSS, Typescript/ES(X) which X the the version of the javascript code. By default ES5;
3. You can devide your project into files to make it easier and faster in developing using inport/export codes in Typescript.
4. Easy and simple line of code using npm will manage the whole project.
5. You can make your own configure as you intend to.
6. This template has all the nessecary dependencies so you dont have to worry about repuckaging.
7. The project will be under watch mode.
8. Abilitiy to test the project using localhost:9000 server.
9. Sbmitt all project changes without refreshing your page.

## 🔬 Installation

Make a project clone into your machine using Git CLI
```JS
git clone https://github.com/AhmedBHameed/Webpack_Template.git
```
Then install the package using node package manager
```JS
npm install
```
Your main application is app.ts so import any modules,classes,sass,css files inside it.
Modify your index.html which is the main template. Any extra library try to attach them inside your app.ts then the package will bundle and attach them all as a final product.
It is located under src folder.
dist is the final project after compiling.

### Scripts that you can use with node package manager (npm):
For the moment you you have those scripts only
```JS
 "scripts": {
		"serve": "webpack-dev-server",
		"mini": "npm-run-all clean minifiy",
	  	"build": "npm-run-all clean rebuild"
  },
```
* For testing the project using localhost:9000 server use
```JS
npm run serve 	// you can change localhost port by changing port number in webpack.config.js line 18
```

* For building the project and keep tracking using watch mode use
```JS
npm run build		// script will run in watch mode that will detect any changes in your project
```

* For build and minify your product as final product use
```JS
npm run mini	// generate minified files of the project
```

Note1: Running any task will make the project in watch mode which that means any changes will be directly detected.

Note2: Both "npm run mini" and "npm run build" uses product mode "npm run serve" use development mode.

Enjoy...

### Built With
* [Webpack](https://webpack.js.org/).

### License

This project is licensed under the MIT License.
In words it is free to use and develope.