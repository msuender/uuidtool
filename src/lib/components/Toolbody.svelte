<script lang="ts">

    import { Container, Row, Col, Button, Icon } from 'sveltestrap';
  
    import Jsoninput from './Jsoninput.svelte';
    import FindUuids from './FindUuids.svelte';
    import {findMaxId,checkAllIsJson} from '../utils/functions/dataRecordUtils';
    import type {IDataRecord} from '../utils/definitions/type_definitions';
    import {ETypeOfUpdate} from '../utils/definitions/enums';
    import {sampleData} from '../utils/data/sampledata';
  

    let dataRecords: IDataRecord[] = [
        {
            "id": 1,
            "inputText": "",
            "outputText": "",
            "inputIsJson": false
        }
    ]

    $: maxDataRecordId = findMaxId(dataRecords);

    const addDataRecordFun = async () => {
        let newDataRecord = {
            "id": maxDataRecordId + 1,
            "inputText": "",
            "outputText": "",
            "inputIsJson": false
        }

        dataRecords = [...dataRecords, newDataRecord];
    }

    const removeDataRecordFun = async (dataRecordId: number) => {
        dataRecords = dataRecords.filter (element => element.id !== dataRecordId)
    }

    $: isOnlyOneDataRecordLeft = dataRecords.length === 1 ? true : false;

    $: allInputTextIsJson = checkAllIsJson(dataRecords);

    const recordUpdateFun = (typeOfUpdate: ETypeOfUpdate) => {
        for (const [index,data] of dataRecords.entries()) {
            switch(typeOfUpdate) {
                case 'sampleData':
                    if (sampleData[index]) dataRecords[index].inputText = JSON.stringify(sampleData[index],null,2);
                    break;
                case 'clear':
                    dataRecords[index].inputText = "";
                    dataRecords[index].outputText="";
                    break;
                case 'copy':
                    dataRecords[index].inputText = dataRecords[index].outputText;
                    dataRecords[index].outputText="";
                    break;
                default:
                    window.alert('Missing typeOfUpdate in recordUpdateFun');
            }
        }
    }

    let findUuidsChild;

</script>

<Container class="mt-3">
    <Row>
        <Col>
            <Button
                color="secondary"
                on:click={()=>recordUpdateFun(ETypeOfUpdate.sampleData)}
                on:click={findUuidsChild.clearResults}
                outline
            >Set sample Data
            </Button>
        </Col>
        <Col>
            <Button 
                color="info" 
                on:click={() => recordUpdateFun(ETypeOfUpdate.copy)}
                on:click={findUuidsChild.clearResults}
            ><Icon name="box-arrow-left"/> Copy Output to Input
            </Button>
        </Col>
    </Row>
</Container>

<hr>

{#each dataRecords as dataRecord (dataRecord.id) }
    <Jsoninput 
        bind:recordId={dataRecord.id}
        bind:inputText={dataRecord.inputText}
        bind:outputText={dataRecord.outputText}
        removeRecordFun={()=>removeDataRecordFun(dataRecord.id)}
        onlyOneDataRecordLeft={isOnlyOneDataRecordLeft}
        bind:inputIsJson={dataRecord.inputIsJson}
    />    
{/each}

<Container>
    <Row>
        <Col>
            <Button 
                color="primary"
                disabled={!allInputTextIsJson}
                on:click={findUuidsChild.findUuidsFun}
                ><Icon name="search"/> Find UUIDs
            </Button>
            <Button 
                color="secondary"
                on:click={() => recordUpdateFun(ETypeOfUpdate.clear)}
                on:click={findUuidsChild.clearResults}
                ><Icon name="trash"/> Clear all
            </Button>
        </Col>
        <Col>
            <Button 
                outline
                color="success"
                on:click={addDataRecordFun}
                class="float-end"
                ><Icon name="plus-square"/> Add Input Section
            </Button>

        </Col>
    </Row>
</Container>

<hr>

<FindUuids
    bind:dataRecordsFromParent={dataRecords}
    bind:this={findUuidsChild}
/>

<!-- new content stops here -------------------------------------------------->