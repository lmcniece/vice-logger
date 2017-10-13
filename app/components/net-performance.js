import Ember from 'ember';

export default Ember.Component.extend({
    assetData: function(){
        const accountTypes = ['brokerage','roth','traditional'];
        let assetRecords = this.get('accountRecords').filter(function(record){
            return accountTypes.includes(record.get('account_type'));
        })
        let dataArray = [];
        accountTypes.forEach(function(accountType){
            dataArray.push(
                assetRecords.filterBy('account_type',accountType)
                    .map(function(record){
                        return record.get('market_change') + record.get('dividend_interest');
                    })
                    .reduce(function(a,b){
                        return a + b;
                    })
            )
        })
        return dataArray;
    }.property('accountRecords'),
    chartOptions: {
        title: {
            display: true,
            text: 'Market Performance',
            fontColor: '#ccc',
            fontSize: 16
        },
        legend: {display: false}
    },
    chartData: Ember.computed('quarterlyAccountData', function(){
        return {
            labels: ['brokerage','roth','traditional'],
            datasets: [{
                backgroundColor: ['yellow','red','blue'],
                data:this.get('assetData')
            }]
        }
    })
});