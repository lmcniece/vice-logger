import Ember from 'ember';

export default Ember.Controller.extend({
    xAxisLength: function(){
        return this.get('model').filterBy('account','brokerage').filterBy('isLastMonthOfQuarter',true).length;
    }.property('model'),
    traditionalData: function(){
        let data = this.get('model').filterBy('account','traditional').filterBy('isLastMonthOfQuarter',true).mapBy('balance_end');
        let offset = this.get('model').filterBy('account','brokerage').filterBy('isLastMonthOfQuarter',true).length-data.length;
        for (var i = 0; i < offset; i++) data.unshiftObject(0);
        return data;
    }.property('model', 'xAxisLength'),
    rothData: function(){
        let data = this.get('model').filterBy('account','roth').filterBy('isLastMonthOfQuarter',true).mapBy('balance_end');
        let offset = this.get('xAxisLength')-data.length;
        for (var i = 0; i < offset; i++) data.unshiftObject(0);
        return data;
    }.property('model', 'xAxisLength'),
    chartOptions: {},
    chartData: Ember.computed('model', function(){
        return {
            labels: this.get('model').filterBy('account','brokerage').filterBy('isLastMonthOfQuarter',true).map(function(investment){
                return investment.get('year') + '-Q' + investment.get('quarter');
            }),
            datasets: [{
                label: "Brokerage",
                data: this.get('model').filterBy('account','brokerage').filterBy('isLastMonthOfQuarter',true).mapBy('balance_end'),
                borderColor: 'blue',
                fill: false
            },{
                label: "Traditional",
                data: this.get('traditionalData'),
                borderColor: 'green',
                fill: false
            },{
                label: "Roth",
                data: this.get('rothData'),
                borderColor: 'red',
                fill: false
            }]
        }
    })
});
