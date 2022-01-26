<script lang="ts">
 // @ts-ignore
 import { Table, Badge, Input } from "sveltestrap";

import type {IResultSet, ISearchResult} from '../utils/definitions/type_definitions';

export let searchResultsFromParent = {} as IResultSet;
export let uuidsToReplaceToParent: string[] = [];

let searchResultsArray;

const serachResultsToArray = (inputArray: IResultSet): IResultSet[] => {
    let tempArray = [];
    for (const resultItem in inputArray) tempArray.push(inputArray[resultItem]);
    return tempArray;
}

$: {
    searchResultsArray = serachResultsToArray(searchResultsFromParent);
}

const uuidSelectionFun = (workArray: string[], uuid: string): string[] => {
    if (workArray.includes(uuid)) {
        workArray = workArray.filter(element => element !== uuid);
    } else {
        workArray.push(uuid);
    }
    return workArray;
}

const handleUuidSelectionFun = (clickedUuid: string): void => {
    uuidsToReplaceToParent = uuidSelectionFun(uuidsToReplaceToParent,clickedUuid);
}


</script>


<style>    
</style>

<Table striped>
    <thead>
        <tr>
            <th style="width: 5%;">Select</th>
            <th style="width: 25%;">UUID</th>
            <th style="width: 70%;">Found in</th>
        </tr>
    </thead>
    <tbody>
        {#each searchResultsArray as searchResultItem}
            <tr>
                <td>
                    <Input id={searchResultItem.uuid} type="checkbox" on:change={()=>handleUuidSelectionFun(searchResultItem.uuid)}/>
                </td>
                <td class='font-monospace'><Badge color="secondary">{searchResultItem.uuid}</Badge></td>
                <td>
                    <ul class="mb-0">
                        {#each searchResultItem.paths as path}
                            <li>{path}</li>
                        {/each}
                    </ul>
                </td>
            </tr>
        {/each}
    </tbody>
</Table>

