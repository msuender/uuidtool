<script lang="ts">
// @ts-ignore
import { Table, Badge, Input } from "sveltestrap";

import type {IResultSet} from '../utils/definitions/type_definitions';

export let searchResultsFromParent = {} as IResultSet;
export let uuidsToReplaceToParent: string[] = [];

let searchResultsArray;
let selectAll = false;
let itemsSelected = false;

const serachResultsToArray = (inputArray: IResultSet): IResultSet[] => {
    let tempArray = [];
    for (const resultItem in inputArray) tempArray.push(inputArray[resultItem]);
    return tempArray;
}

$: {
    searchResultsArray = serachResultsToArray(searchResultsFromParent);
}

const uuidSelectionFun = (workArray: string[], uuid: string): string[] => {

    if (selectAll) selectAll = false;

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

const allSelectionFun = (uuidList, allToSelect: boolean) => {
    let tempUuidList = [];
    if (allToSelect) uuidList.forEach((resultItem) => tempUuidList.push(resultItem.uuid));
    return tempUuidList;
}

const handleAllSelectionFun = (): void => {
    selectAll = !selectAll;
    itemsSelected = selectAll;
    uuidsToReplaceToParent = allSelectionFun(searchResultsArray,selectAll)
}

</script>


<style>    
</style>

<Table striped>
    <thead>
        <tr>
            <th style="width: 5%;">
                <Input
                    id="tickAll"
                    type="checkbox"
                    on:change={() => handleAllSelectionFun()}
                    bind:checked={selectAll}
                    disabled={searchResultsArray.lenght === 0}
                />
            </th>
            <th style="width: 25%;">UUID</th>
            <th style="width: 70%;">Found in</th>
        </tr>
    </thead>
    <tbody>
        {#each searchResultsArray as searchResultItem}
            <tr>
                <td>
                    <Input 
                        id={searchResultItem.uuid}
                        type="checkbox"
                        on:change={()=>handleUuidSelectionFun(searchResultItem.uuid)}
                        checked={itemsSelected}
                    />
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

