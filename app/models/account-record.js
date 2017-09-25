import DS from 'ember-data';

export default DS.Model.extend({
    year: DS.attr(),
    month: DS.attr(),
    balance_start: DS.attr(),
    balance_end: DS.attr(),
    market_change: DS.attr(),
    dividend_interest: DS.attr(),
    fees: DS.attr(),
    withdrawals: DS.attr(),
    deposits: DS.attr(),
    account: DS.attr(),
    account_type: DS.attr(),
    quarter: function() {
        return Math.trunc(((this.get('month')-1)/3) + 1);
    }.property('month'),
    isLastMonthOfQuarter: function(){
        return (this.get('month') % 3 === 0);
    }.property('month')
});