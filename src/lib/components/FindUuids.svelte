<script lang="ts">
// @ts-ignore
import { Container, Col, Row, Alert, Button, Badge} from 'sveltestrap';
import { fade } from 'svelte/transition';
import {findUuidsInObject} from '../utils/functions/findUuidsInObject';
import {replaceUuids} from '../utils/functions/replaceUuids';
import type {IResultSet, IConvertedDataRecords} from '../utils/definitions/type_definitions';

import Selectlist from './Selectlist.svelte';

export let dataRecordsFromParent;

let searchResults = {} as IResultSet;
let convertedDataRecords: IConvertedDataRecords;
let noUuidsFoundAlertVisible = false;
let uuidsToReplaceFromChild: string[] = [];

const convertDataRecordsToJson = (arrayInput): IConvertedDataRecords => {
    let tempOutJson = {} as IConvertedDataRecords;
    arrayInput.forEach( (element) => tempOutJson[element.id] = JSON.parse(element.inputText));
    return tempOutJson;
}

export const findUuidsFun = () => {
    convertedDataRecords = convertDataRecordsToJson(dataRecordsFromParent);
    searchResults = findUuidsInObject(convertedDataRecords);
    if (Object.keys(searchResults).length === 0) noUuidsFoundAlertVisible = true;
}

export const clearResults = () => {
    searchResults = {};
    noUuidsFoundAlertVisible = false;
    uuidsToReplaceFromChild = [];
}

const replaceDataInRecordsFun = () => {
    let replacedDataRecords = replaceUuids(convertedDataRecords,searchResults,uuidsToReplaceFromChild)

    for (const [index,data] of dataRecordsFromParent.entries()) {
        if (replacedDataRecords[data.id]) dataRecordsFromParent[index].outputText = JSON.stringify(replacedDataRecords[data.id],null,2)
    } 
}

</script>

<Container>
    <Row>
        <Col class="mt-2">
            <h6><Badge color="dark">{Object.keys(searchResults).length}</Badge> UUIDs found</h6>
            <Alert
                color="warning"
                isOpen={noUuidsFoundAlertVisible} 
                toggle={() => (noUuidsFoundAlertVisible = false)}
            >No UUIDs found. Please correct your input and try again!
            </Alert>
            <Selectlist
                bind:searchResultsFromParent={searchResults}
                bind:uuidsToReplaceToParent={uuidsToReplaceFromChild}
            />
        </Col>
    </Row>
    <Row class="mt-3">
        <Col>
            <Button
                color="primary"
                disabled={uuidsToReplaceFromChild.length === 0} 
                on:click={replaceDataInRecordsFun} 
            >Replace
                <Badge color="dark">{uuidsToReplaceFromChild.length}</Badge> 
             selected UUID(s)
            </Button>
        </Col>
    </Row>
</Container>