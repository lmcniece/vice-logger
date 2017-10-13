import Ember from 'ember';

export default Ember.Component.extend({
    assetData: function(){
        let accountTypes = this.get('accountRecords').mapBy('account_type').uniq();
        let assetRecords = this.get('accountRecords').sortBy('year','quarter');
        let dataArray = [];
        let labelArray = [];
        accountTypes.forEach(function(accountType){
            dataArray.push(assetRecords.filterBy('account_type',accountType).reduce(function(a,b){
                const currentDate = a.get('year')+a.get('month')/100;
                const nextDate = b.get('year')+b.get('month')/100;
                return currentDate > nextDate ? a : b;
            }).get('balance_end'));
            labelArray.push(accountType);
        })
        return { data:dataArray, labels:labelArray };
    }.property('accountRecords'),
    chartOptions: {
        title: {
            display: true,
            text: 'Current Assets',
            fontColor: '#ccc',
            fontSize: 16
        }
    },
    chartData: Ember.computed('accountRecords', function(){
        return {
            labels: this.get('assetData').labels,
            datasets: [{
                data: this.get('assetData').data,
                borderColor: ['red','yellow','blue','green','purple'],
                hoverBackgroundColor: ['red','yellow','blue','green','purple']
            }]
        }
    })
});