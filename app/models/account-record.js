import DS from 'ember-data';

export default DS.Model.extend({
    year: DS.attr("number"),
    month: DS.attr("number"),
    balance_start: DS.attr("number"),
    balance_end: DS.attr("number"),
    market_change: DS.attr("number"),
    dividend_interest: DS.attr("number"),
    fees: DS.attr("number"),
    withdrawals: DS.attr("number"),
    deposits: DS.attr("number"),
    account: DS.attr("string"),
    account_type: DS.attr("string"),
    quarter: Ember.computed('month', function() {
        let month = this.get('month');
        return (Math.ceil(month / 3));
    }),
    yearQuarterLabel: Ember.computed('year','quarter', function() {
        return this.get('year')+'-Q'+this.get('quarter');
    }),
    net: Ember.computed('market_change','dividend_interest','fees','withdrawals','deposits', function() {
        return this.get('market_change') + this.get('dividend_interest') + this.get('fees') - this.get('withdrawals') + this.get('deposits');
    }),
    roi: Ember.computed('market_change','dividend_interest','fees','withdrawals','deposits', function() {
        return this.get('market_change') + this.get('dividend_interest') + this.get('fees');
    })
});