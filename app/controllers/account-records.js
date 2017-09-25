import Ember from 'ember';

export default Ember.Controller.extend({
    xAxisLength: function(){
        return this.get('model').filterBy('account_type','brokerage').filterBy('isLastMonthOfQuarter',true).length;
    }.property('model'),
    traditionalData: function(){
        let data = this.get('model').filterBy('account_type','traditional').filterBy('isLastMonthOfQuarter',true).mapBy('balance_end');
        let offset = this.get('model').filterBy('account_type','brokerage').filterBy('isLastMonthOfQuarter',true).length-data.length;
        for (var i = 0; i < offset; i++) data.unshiftObject(0);
        return data;
    }.property('model', 'xAxisLength'),
    rothData: function(){
        let data = this.get('model').filterBy('account_type','roth').filterBy('isLastMonthOfQuarter',true).mapBy('balance_end');
        let offset = this.get('xAxisLength')-data.length;
        for (var i = 0; i < offset; i++) data.unshiftObject(0);
        return data;
    }.property('model', 'xAxisLength'),
    cashData: function(){
        let data = this.get('model').filterBy('account_type','cash').filterBy('isLastMonthOfQuarter',true).mapBy('balance_end');
        let offset = this.get('xAxisLength')-data.length;
        for (var i = 0; i < offset; i++) data.unshiftObject(0);
        return data;
    }.property('model', 'xAxisLength'),
    chartOptions: {},
    chartData: Ember.computed('model', function(){
        return {
            labels: this.get('model').filterBy('account_type','brokerage').filterBy('isLastMonthOfQuarter',true).map(function(investment){
                return investment.get('year') + '-Q' + investment.get('quarter');
            }),
            datasets: [{
                label: "Brokerage",
                data: this.get('model').filterBy('account_type','brokerage').filterBy('isLastMonthOfQuarter',true).mapBy('balance_end'),
                borderColor: 'yellow',
                fill: false
            },{
                label: "Traditional",
                data: this.get('traditionalData'),
                borderColor: 'blue',
                fill: false
            },{
                label: "Roth",
                data: this.get('rothData'),
                borderColor: 'red',
                fill: false
            },{
                label: "Cash",
                data: this.get('cashData'),
                borderColor: 'green',
                fill: false
            }]
        }
    })
});
