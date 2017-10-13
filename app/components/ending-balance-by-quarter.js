import Ember from 'ember';
import generateQuarterlyChartData from '../utils/generate-quarterly-chart-data';

export default Ember.Component.extend({
    xAxisLabels: function(){
        let labels = this.get('accountRecords').sortBy('year','month').map(function(record){
            return record.get('year')+'-Q'+record.get('quarter');
        }).uniq();
        return labels;
    }.property('accountRecords'),
    quarterlyAccountData: function(){
        //Generate an object of all labels - will be used to fill/offset account types with null records
        let labels = {};
        this.get('xAxisLabels').forEach(function(label){
             labels[label]=0;
        });
        //Generate Records Object
        let accountTypes = this.get('accountRecords').mapBy('account_type').uniq();
        let quarterlyRecords = this.get('accountRecords')
                                    .filter(function(record){
                                        return [3,6,9,12].includes(record.get('month'));
                                    })
                                    .sortBy('year','month')
        return generateQuarterlyChartData(accountTypes,labels,quarterlyRecords,'balance_end');
    }.property('accountRecords', 'xAxisLabels'),
    chartOptions: {
        title: {
            display: true,
            text: 'Ending Balances',
            fontColor: '#ccc',
            fontSize: 16
        },
        spanGaps: true
    },
    chartData: Ember.computed('quarterlyAccountData', function(){
        return {
            labels: this.get('xAxisLabels'),
            datasets: [{
                label: "Brokerage",
                data: Object.values(this.get('quarterlyAccountData')['brokerage']),
                borderColor: 'grey',
                fill: false
            },{
                label: "Traditional",
                data: Object.values(this.get('quarterlyAccountData')['traditional']),
                borderColor: 'blue',
                fill: false
            },{
                label: "Roth",
                data: Object.values(this.get('quarterlyAccountData')['roth']),
                borderColor: 'red',
                fill: false
            },{
                label: "Cash",
                data: Object.values(this.get('quarterlyAccountData')['cash']),
                borderColor: 'green',
                fill: false
            },{
                label: "HSA",
                data: Object.values(this.get('quarterlyAccountData')['hsa']),
                borderColor: 'yellow',
                fill: false
            }]
        }
    })
});