import type {IResultSet} from '../definitions/type_definitions';
import {getPathInObject} from './getPathInObject';

export const findUuidsInObject = (data: object): IResultSet => {

    let searchResult = getPathInObject(data,8);
    let resultSet = {};
        
    for (var finding in searchResult) {
    
        var foundUuid = (searchResult[finding].split(";;"))[1];
        var foundPath = (searchResult[finding].split(";;"))[0];

        if (resultSet[foundUuid]) {
            resultSet[foundUuid].paths.push(foundPath);
        } else {
            resultSet[foundUuid] = {"paths": [foundPath], "uuid": foundUuid, "selected": false};
        } 
    }

    return resultSet;
}