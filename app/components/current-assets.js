import Ember from 'ember';

export default Ember.Component.extend({
    assetData: function(){
        let accountTypes = this.get('accountRecords').mapBy('account_type').uniq();
        let assetRecords = this.get('accountRecords').sortBy('year','quarter');
        const colorLookup = {
            'roth':'red',
            'brokerage':'grey',
            'traditional':'blue',
            'cash':'green',
            'hsa':'yellow'
        }
        let dataArray = [];
        let labelArray = [];
        let colorArray = [];
        accountTypes.forEach(function(accountType){
            dataArray.push(assetRecords.filterBy('account_type',accountType).reduce(function(a,b){
                const currentDate = a.get('year')+a.get('month')/100;
                const nextDate = b.get('year')+b.get('month')/100;
                return currentDate > nextDate ? a : b;
            }).get('balance_end'));
            labelArray.push(accountType);
            colorArray.push(colorLookup[accountType]||"pink");
        })
        return { data:dataArray, labels:labelArray, colors:colorArray};
    }.property('accountRecords'),
    chartOptions: {
        title: {
            display: true,
            text: 'Current Assets',
            fontColor: '#ccc',
            fontSize: 16
        },
        legend: {display:false}
    },
    chartData: Ember.computed('accountRecords', function(){
        return {
            labels: this.get('assetData').labels,
            datasets: [{
                data: this.get('assetData').data,
                borderColor: this.get('assetData').colors,
                hoverBackgroundColor: this.get('assetData').colors
            }]
        }
    })
});