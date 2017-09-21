import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'http://localhost:3000',
    // host: 'http://vice-server.herokuapp.com'
    namespace: 'api',
    pathForType: function(type) {
      return Ember.String.pluralize(type).dasherize(type);
    }
});