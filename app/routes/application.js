import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({
            quarterlyAccountRecords: this.store.findAll('quarterlyAccountRecord'),
            quarterlyNetReturns: this.store.findAll('quarterlyNetReturn')
        })
    }
});