import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        /* jshint camelcase: false */
        return this.store.findAll('accountRecord');
    }
});