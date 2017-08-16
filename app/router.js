import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    
    // Friends area
    this.route('users');
    this.route('user', { path: '/users/:userId' });
    
});

export default Router;
