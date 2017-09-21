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
    account: DS.attr()
});
