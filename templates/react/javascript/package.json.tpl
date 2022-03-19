{
  "name": "{{name}}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --mode=production",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.17.7",
    "@babel/preset-env": "^7.16.11",
    "@babel/preset-react": "^7.16.7",
    "autoprefixer": "^10.4.4",
    "babel-loader": "^8.2.3",
    "clean-webpack-plugin": "^4.0.0",
    "cross-env": "^7.0.3",
    "css-loader": "^6.6.0",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.0",
    "less": "^4.1.2",
    "less-loader": "^10.2.0",
    "postcss-less": "^6.0.0",
    "postcss-loader": "^6.2.1",
    "postcss-nested": "^5.0.6",
    "speed-measure-webpack-plugin": "^1.5.0",
    "style-loader": "^3.3.1",
    "terser-webpack-plugin": "^5.3.1",
    "url-loader": "^4.1.1",
    "webpack": "^5.70.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  },
  "dependencies": {
    "react": "17.x",
    "react-dom": "17.x"
  }
}
