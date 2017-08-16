import DS from 'ember-data';

export default DS.Model.extend({
    username: DS.attr(),
    given_name: DS.attr(),
    surname: DS.attr(),
    created_at: DS.attr(),
    updated_at: DS.attr()
});