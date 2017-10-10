import Ember from 'ember';

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
        let dataArray = []; //main array we will return
        accountTypes.forEach(function(accountType){
            let records = {};
            //Deep clone the labels to each account type of the array
            dataArray[accountType] = JSON.parse(JSON.stringify(labels));
            quarterlyRecords.filterBy('account_type',accountType)
                .forEach(function(record){
                    records[record.get('yearQuarterLabel')] = record.get('balance_end');
                });
            Object.assign(dataArray[accountType], records);
        })
        return dataArray;
    }.property('accountRecords', 'xAxisLabels'),
    chartOptions: {
        spanGaps: true
    },
    chartData: Ember.computed('quarterlyAccountData', function(){
        return {
            labels: this.get('xAxisLabels'),
            datasets: [{
                label: "Brokerage",
                data: Object.values(this.get('quarterlyAccountData')['brokerage']),
                borderColor: 'yellow',
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
                borderColor: 'white',
                fill: false
            }]
        }
    })
});