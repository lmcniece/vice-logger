import Ember from 'ember';

export default Ember.Component.extend({
    xAxisLabels: function(){
        let labels = this.get('accountRecords')
            .sortBy('year','month')
            .map(function (record) {
                return record.get('year')+'-Q'+record.get('quarter');
            })
            .uniq();
        return labels;
    }.property('accountRecords'),

    quarterlyAccountData: function(){
        //Generate an object of all labels - will be used to fill/offset account types with null records
        let labels = {};
        this.get('xAxisLabels').forEach(function (label) {
             labels[label]=0;
        });
        let accountTypes = this.get('accountRecords')
            .mapBy('account_type')
            .uniq();
        let quarterlyRecords = this.get('accountRecords')
            .sortBy('year','quarter');
        let dataArray = JSON.parse(JSON.stringify(labels));
        let records = {};
        //Deep clone the labels to each account type of the array
        quarterlyRecords.forEach(function(record){
            let yearQuarter = record.get('yearQuarterLabel');
            //If this is the first record for a YYYY-QQ, set to zero
            if (!records[yearQuarter]) { records[yearQuarter] = 0; }
            records[yearQuarter] += record.get('netDeposits');
        });
        Object.assign(dataArray, records);
        return dataArray;
    }.property('accountRecords', 'xAxisLabels'),

    chartOptions: {
        title: {
            display: true,
            text: 'Net Deposits',
            fontColor: '#ccc',
            fontSize: 16
        },
        legend: {
            display: false
        },
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
                data: Object.values(this.get('quarterlyAccountData')),
                backgroundColor: '#a33'
            }]
        }
    })
});
