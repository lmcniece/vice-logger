export default function generateQuarterlyChartData(accountTypes,labels,quarterlyRecords,dataPoint) {
    let dataArray = []; //main array we will return
    accountTypes.forEach(function(accountType){
        let records = {};
        //Deep clone the labels to each account type of the array
        dataArray[accountType] = JSON.parse(JSON.stringify(labels));
        quarterlyRecords.filterBy('account_type',accountType)
            .forEach(function(record){
                if(!records[record.get('yearQuarterLabel')]){records[record.get('yearQuarterLabel')] = 0;}
                records[record.get('yearQuarterLabel')] += record.get(dataPoint);
            });
        Object.assign(dataArray[accountType], records);
    });
    return dataArray;
}
