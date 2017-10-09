import DS from 'ember-data';

export default DS.Model.extend({
    year: DS.attr('number'),
    quarter: DS.attr('number'),
    net: DS.attr(),
    account_type: DS.attr('string')
});