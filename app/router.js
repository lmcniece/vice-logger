import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    
    // Friends area
    this.route('friends');
    this.route('melissa', { path: '/friends/melissa' });
    this.route('alla', { path: '/friends/alla' });
    this.route('logan', { path: '/friends/logan' });
    this.route('melanie', { path: '/friends/melanie' });
    
});

export default Router;
