import type {IResultSet} from './utils';
import {getValuePathInObject} from './getValuePathInObject';

export const findUuids = (data: object): IResultSet => {

    let testResult = getValuePathInObject(data,8);
    let resultSet = {};
        
    for (var finding in testResult) {
    
        var foundUuid = (testResult[finding].split(";;"))[1];
        var foundPath = (testResult[finding].split(";;"))[0];

        if (resultSet[foundUuid]) {
            resultSet[foundUuid].paths.push(foundPath);
        } else {
            resultSet[foundUuid] = {"paths": [foundPath]};
        } 
    }

    return resultSet;
}