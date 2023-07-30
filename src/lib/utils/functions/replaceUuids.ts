import {createUuid} from './createUuid';
import type {IConvertedDataRecords} from '../definitions/type_definitions';

export const replaceUuids = (dataRecordsJson, uuidSearchResult, selectedUuids) => {

    //deep cloning needed
    const workJSON: IConvertedDataRecords = JSON.parse(JSON.stringify(dataRecordsJson));

    for (var item in selectedUuids) {

        let fullPaths: string [] = uuidSearchResult[selectedUuids[item]].paths;
        let newUuid: string = createUuid();
        
        for (var pathItem in fullPaths) {

          let splitter: string[] = fullPaths[pathItem].split('.');

              switch (splitter.length) {
              case 1: workJSON[splitter[0]] = newUuid; break;
              case 2: workJSON[splitter[0]][splitter[1]] = newUuid; break;
              case 3: workJSON[splitter[0]][splitter[1]][splitter[2]] = newUuid; break;
              case 4: workJSON[splitter[0]][splitter[1]][splitter[2]][splitter[3]] = newUuid; break;
              case 5: workJSON[splitter[0]][splitter[1]][splitter[2]][splitter[3]][splitter[4]] = newUuid; break;
              case 6: workJSON[splitter[0]][splitter[1]][splitter[2]][splitter[3]][splitter[4]][splitter[5]] = newUuid; break;
              case 7: workJSON[splitter[0]][splitter[1]][splitter[2]][splitter[3]][splitter[4]][splitter[5]][splitter[6]] = newUuid; break;
              case 8: workJSON[splitter[0]][splitter[1]][splitter[2]][splitter[3]][splitter[4]][splitter[5]][splitter[6]][splitter[7]] = newUuid; break;
              case 9: workJSON[splitter[0]][splitter[1]][splitter[2]][splitter[3]][splitter[4]][splitter[5]][splitter[6]][splitter[7]][splitter[8]] = newUuid; break;
          }
      }
    }
  //outputJson = {...workJSON};
  return workJSON;
}