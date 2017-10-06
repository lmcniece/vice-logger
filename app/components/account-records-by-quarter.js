import Ember from 'ember';

export default Ember.Component.extend({
    xAxisLabels: function(){
        let labels = this.get('quarterlyAccountRecords').map(function(record){
            return record.get('year')+'-Q'+record.get('quarter');
        }).uniq();
        return labels;
    }.property('quarterlyAccountRecords'),
    brokerageData: function(){
        let labels = {};
        this.get('xAxisLabels').forEach(function(label){
             labels[label]=0;
        });
        let records = {};
        this.get('quarterlyAccountRecords').filterBy('account_type','brokerage').forEach(function(record){
                records[record.get('year')+'-Q'+record.get('quarter')] = record.get('balance_end');
        });
        let dataArray = Object.assign(labels, records);
        return Object.values(dataArray);
    }.property('quarterlyAccountRecords', 'xAxisLabels'),
    traditionalData: function(){
        let labels = {};
        this.get('xAxisLabels').forEach(function(label){
             labels[label]=0;
        });
        let records = {};
        this.get('quarterlyAccountRecords').filterBy('account_type','traditional').forEach(function(record){
                records[record.get('year')+'-Q'+record.get('quarter')] = record.get('balance_end');
        });
        let dataArray = Object.assign(labels, records);
        return Object.values(dataArray);
    }.property('quarterlyAccountRecords', 'xAxisLabels'),
    rothData: function(){
        let labels = {};
        this.get('xAxisLabels').forEach(function(label){
             labels[label]=0;
        });
        let records = {};
        this.get('quarterlyAccountRecords').filterBy('account_type','roth').forEach(function(record){
                records[record.get('year')+'-Q'+record.get('quarter')] = record.get('balance_end');
        });
        let dataArray = Object.assign(labels, records);
        return Object.values(dataArray);
    }.property('quarterlyAccountRecords', 'xAxisLabels'),
    cashData: function(){
        let labels = {};
        this.get('xAxisLabels').forEach(function(label){
             labels[label]=0;
        });
        let records = {};
        this.get('quarterlyAccountRecords').filterBy('account_type','cash').forEach(function(record){
                records[record.get('year')+'-Q'+record.get('quarter')] = record.get('balance_end');
        });
        let dataArray = Object.assign(labels, records);
        return Object.values(dataArray);
    }.property('quarterlyAccountRecords', 'xAxisLabels'),
    hsaData: function(){
        let labels = {};
        this.get('xAxisLabels').forEach(function(label){
             labels[label]=0;
        });
        let records = {};
        this.get('quarterlyAccountRecords').filterBy('account_type','hsa').forEach(function(record){
                records[record.get('year')+'-Q'+record.get('quarter')] = record.get('balance_end');
        });
        let dataArray = Object.assign(labels, records);
        return Object.values(dataArray);
    }.property('quarterlyAccountRecords', 'xAxisLabels'),
    chartOptions: {
        spanGaps: true
    },
    chartData: Ember.computed('quarterlyAccountRecords', function(){
        return {
            labels: this.get('xAxisLabels'),
            datasets: [{
                label: "Brokerage",
                data: this.get('brokerageData'),
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
            },{
                label: "HSA",
                data: this.get('hsaData'),
                borderColor: 'white',
                fill: false
            }]
        }
    })
});
