# sketch-vue


[![Build Status](https://travis-ci.org/ReneCode/sketch-vue.svg?branch=master)](https://travis-ci.org/ReneCode/sketch-vue)

[Web-App](https://sketch-vue.firebaseapp.com/)

> A Vue.js project

## Testing
[Hints for vue unit testing](https://eddyerburgh.me/unit-test-vue-components-beginners)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Architecture

### Interaction
/src/interaction/ia

base class is **IaBase** for all interaction

start an interaction with:
    store.dispatch('setInteractionMode', {
      mode: 'select' | 'delete' | 'panning' | ... see *interaction-mode*
    })