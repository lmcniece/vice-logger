import Ember from 'ember';
import generateChartData from '../utils/generate-chart-data';

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
        let accountTypes = this.get('accountRecords').mapBy('account_type').uniq();
        let quarterlyRecords = this.get('accountRecords').sortBy('year','quarter');
        let dataArray = []; //main array we will return
        return generateChartData(accountTypes,labels,quarterlyRecords,'net');
    }.property('accountRecords', 'xAxisLabels'),
    chartOptions: {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    },
    chartData: Ember.computed('accountRecords', function(){
        return {
            labels: this.get('xAxisLabels'),
            datasets: [{
                label: "Brokerage",
                data: Object.values(this.get('quarterlyAccountData')['brokerage']),
                backgroundColor: 'yellow'
            },{
                label: "Traditional",
                data: Object.values(this.get('quarterlyAccountData')['traditional']),
                backgroundColor: 'blue'
            },{
                label: "Roth",
                data: Object.values(this.get('quarterlyAccountData')['roth']),
                backgroundColor: 'red'
            },{
                label: "Cash",
                data: Object.values(this.get('quarterlyAccountData')['cash']),
                backgroundColor: 'green'
            },{
                label: "HSA",
                data: Object.values(this.get('quarterlyAccountData')['hsa']),
                backgroundColor: 'white'
            }]
        }
    })
});
