import Ember from 'ember';

export default Ember.Component.extend({
    xAxisLabels: function(){
        let labels = this.get('quarterlyNetReturns').map(function(record){
            return record.get('year')+'-Q'+record.get('quarter');
        }).uniq();
        return labels;
    }.property('quarterlyNetReturns'),
    brokerageData: function(){
        let labels = {};
        this.get('xAxisLabels').forEach(function(label){
             labels[label]=0;
        });
        let records = {};
        this.get('quarterlyNetReturns').filterBy('account_type','brokerage').forEach(function(record){
                records[record.get('year')+'-Q'+record.get('quarter')] = record.get('net');
        });
        let dataArray = Object.assign(labels, records);
        return Object.values(dataArray);
    }.property('quarterlyNetReturns', 'xAxisLabels'),
    traditionalData: function(){
        let labels = {};
        this.get('xAxisLabels').forEach(function(label){
             labels[label]=0;
        });
        let records = {};
        this.get('quarterlyNetReturns').filterBy('account_type','traditional').forEach(function(record){
                records[record.get('year')+'-Q'+record.get('quarter')] = record.get('net');
        });
        let dataArray = Object.assign(labels, records);
        return Object.values(dataArray);
    }.property('quarterlyNetReturns', 'xAxisLabels'),
    rothData: function(){
        let labels = {};
        this.get('xAxisLabels').forEach(function(label){
             labels[label]=0;
        });
        let records = {};
        this.get('quarterlyNetReturns').filterBy('account_type','roth').forEach(function(record){
                records[record.get('year')+'-Q'+record.get('quarter')] = record.get('net');
        });
        let dataArray = Object.assign(labels, records);
        return Object.values(dataArray);
    }.property('quarterlyNetReturns', 'xAxisLabels'),
    cashData: function(){
        let labels = {};
        this.get('xAxisLabels').forEach(function(label){
             labels[label]=0;
        });
        let records = {};
        this.get('quarterlyNetReturns').filterBy('account_type','cash').forEach(function(record){
                records[record.get('year')+'-Q'+record.get('quarter')] = record.get('net');
        });
        let dataArray = Object.assign(labels, records);
        return Object.values(dataArray);
    }.property('quarterlyNetReturns', 'xAxisLabels'),
    hsaData: function(){
        let labels = {};
        this.get('xAxisLabels').forEach(function(label){
             labels[label]=0;
        });
        let records = {};
        this.get('quarterlyNetReturns').filterBy('account_type','hsa').forEach(function(record){
                records[record.get('year')+'-Q'+record.get('quarter')] = record.get('net');
        });
        let dataArray = Object.assign(labels, records);
        return Object.values(dataArray);
    }.property('quarterlyNetReturns', 'xAxisLabels'),
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
    chartData: Ember.computed('quarterlyNetReturns', function(){
        return {
            labels: this.get('xAxisLabels'),
            datasets: [{
                label: "Brokerage",
                data: this.get('brokerageData'),
                backgroundColor: 'yellow'
            },{
                label: "Traditional",
                data: this.get('traditionalData'),
                backgroundColor: 'blue'
            },{
                label: "Roth",
                data: this.get('rothData'),
                backgroundColor: 'red'
            },{
                label: "Cash",
                data: this.get('cashData'),
                backgroundColor: 'green'
            },{
                label: "HSA",
                data: this.get('hsaData'),
                backgroundColor: 'white'
            }]
        }
    })
});
