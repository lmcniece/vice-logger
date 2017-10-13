import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

//Global defaults for ChartJS
Chart.defaults.global.layout = { padding: {bottom:25} }

loadInitializers(App, config.modulePrefix);

export default App;
