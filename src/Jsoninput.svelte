<script lang="ts">
  // @ts-ignore
  import { Alert, Container, Row, Col, Button, FormGroup, Input, Label } from "sveltestrap";
  
  import {findUuids} from './utils/uuidfinder'
  import {createUuid} from './utils/uuidcreator';
  import {sampleJSON1, sampleJSON2, sampleJSON3} from './utils/samplejson';
  import type {IUuidsFoundItem, IInputOutputJson, IResultSet} from './utils/utils'
  import {EWhatToDo, EInputFields} from './utils/utils'
  
  let textInput1: string;
  let textInput2: string;
  let textInput3: string;
  let inputJson: IInputOutputJson = {"input1": {}, "input2": {}, "input3": {}};
  let uuidsFound = {} as IResultSet;
  let uuidsToReplace: string[] = [];
  let outputJson: IInputOutputJson = {"input1": {}, "input2": {}, "input3": {}};
  let outputObj1: string;
  let outputObj2: string;
  let outputObj3: string;
  let alertVisible: boolean = false;

  const clearOrCopy = (whatToDo: EWhatToDo): void => {

      if (whatToDo === EWhatToDo.copy) {
            let newInputJson: IInputOutputJson = JSON.parse(JSON.stringify(outputJson));
            textInput1 = JSON.stringify(newInputJson.input1, null, 2);
            textInput2 = JSON.stringify(newInputJson.input2, null, 2);
            textInput3 = JSON.stringify(newInputJson.input3, null, 2);
      } else {
            textInput1 = "";
            textInput2 = "";
            textInput3 = "";
            alertVisible = false;
      }

    uuidsFound = {};
    uuidsToReplace = [];
    outputJson = {"input1": {}, "input2": {}, "input3": {}};
  }


  $: input1IsJson = isJSON(textInput1, EInputFields.input1);
  $: input2IsJson = isJSON(textInput2, EInputFields.input2);
  $: input3IsJson = isJSON(textInput3, EInputFields.input3);

  const isJSON = (textToCheck: string, field: EInputFields): boolean => {

       try { 
           JSON.parse(textToCheck); 
           inputJson[field] = JSON.parse(textToCheck);
           return true; 
        } 
       catch (e) { 
           inputJson[field] = {};
           return false;
        } 
  };

  const setSampleInput = (): void => {
      textInput1 = JSON.stringify(sampleJSON1, null, 2);
      textInput2 = JSON.stringify(sampleJSON2, null, 2);
      textInput3 = JSON.stringify(sampleJSON3, null, 2);
  }

  const findUuidsInInput = (): void => {
      uuidsFound = findUuids(inputJson);

      if (Object.keys(uuidsFound).length === 0) alertVisible = true;
  }

  $: availableUuids = Object.keys(uuidsFound);

  $: uuidsFoundArray = uuidsFoundToArray(availableUuids);

  const uuidsFoundToArray = (availableUuidsInput: string[]) => {

      let workArray: IUuidsFoundItem[] = [];

      for (var item in availableUuidsInput) {

          let workItem = {} as IUuidsFoundItem;

          workItem.uuid = availableUuidsInput[item];
          workItem.paths = uuidsFound[availableUuidsInput[item]].paths;

          workArray.push(workItem);

      }

      return workArray;
  }

  $: selectedUuids = uuidsToReplace;

  const replaceUuids = () => {

      //deep cloning absolutely needed
      const workJSON: IInputOutputJson = JSON.parse(JSON.stringify(inputJson));

      for (var item in selectedUuids) {

          let allPaths: string [] = uuidsFound[selectedUuids[item]].paths;
          let newUuid: string = createUuid();
          
          for (var pathItem in allPaths) {

            let splitter: string[] = allPaths[pathItem].split('.');

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
    outputJson = {...workJSON};
  }

$: outputObj1 = JSON.stringify(outputJson.input1, null, 2);
$: outputObj2 = JSON.stringify(outputJson.input2, null, 2);
$: outputObj3 = JSON.stringify(outputJson.input3, null, 2);

</script>

<style>
/* textarea is styed by class "text-monospace" */

</style>

<Container class="mt-3">
    <Row>
        <Col>
            <Button color="secondary" on:click={setSampleInput}>Sample JSON</Button>
        </Col>
        <Col>
            <Button color="info" on:click={() => clearOrCopy(EWhatToDo.copy)} class="accent-button">Copy Output to Input</Button>
        </Col>
    </Row>
</Container>

<hr>

<Container>
    <Row>
        <Col>
            <FormGroup>
                <Label for="input1">Input 1</Label>
                <Input class="font-monospace text-small" type="textarea" name="Input1" id="input1" bind:value={textInput1} cols={1} rows={20} placeholder="Paste your JSON here!" style="font-size: 80%;"/>
            </FormGroup>
            Is it a JSON? {input1IsJson}
        </Col>
        <Col>
            <FormGroup>
                <Label for="output1">Output 1</Label>
                <Input class="font-monospace" type="textarea" name="Output1" id="output1" bind:value={outputObj1} cols={1} rows={20} readonly style="font-size: 80%;"/>
            </FormGroup>
        </Col>
    </Row>
</Container>

<hr>

<Container>
    <Row>
        <Col>
            <FormGroup>
                <Label for="input2">Input 2</Label>
                <Input class="font-monospace" type="textarea" name="Input2" id="input2" bind:value={textInput2} cols={1} rows={20} placeholder="Paste your JSON here!" style="font-size: 80%;"/>
            </FormGroup>
            Is it a JSON? {input1IsJson}
        </Col>
        <Col>
            <FormGroup>
                <Label for="output2">Output 2</Label>
                <Input class="font-monospace" type="textarea" name="Output2" id="output2" bind:value={outputObj2} cols={1} rows={20} readonly style="font-size: 80%;"/>
            </FormGroup>
        </Col>
    </Row>
</Container>

<hr>

<Container>
    <Row>
        <Col>
            <FormGroup>
                <Label for="input3">Input 3</Label>
                <Input class="font-monospace" type="textarea" name="Input3" id="input3" bind:value={textInput3} cols={1} rows={20} placeholder="Paste your JSON here!" style="font-size: 80%;"/>
            </FormGroup>
            Is it a JSON? {input1IsJson}
        </Col>
        <Col>
            <FormGroup>
                <Label for="output2">Output 3</Label>
                <Input class="font-monospace" type="textarea" name="Output3" id="output3" bind:value={outputObj3} cols={1} rows={20} readonly style="font-size: 80%;"/>
            </FormGroup>
        </Col>
    </Row>
</Container>

<hr>

<Container>
    <Row>
        <Col class="mr-auto">
            <Button color="primary" disabled={!input1IsJson && !input2IsJson && !input3IsJson} on:click={findUuidsInInput}>Finde UUIDs</Button>
            <Button color="secondary" on:click={() => clearOrCopy(EWhatToDo.clear)}>Reset</Button>
        </Col>
    </Row>
    <Row>
        <Col class="mt-3">
            <h5>Found UUIDs and their path:</h5>
            <Alert color="warning" isOpen={alertVisible} toggle={() => (alertVisible = false)}>
                No UUIDs found. Please correct your input and try again!
            </Alert>
            <ul>
                {#each uuidsFoundArray as mainItem}
                    <li>{mainItem.uuid}
                        <ul>
                            {#each mainItem.paths as subItem}
                                <li>{subItem}</li>
                            {/each}
                        </ul>
                    </li>  
                {/each}
            </ul>
        </Col>
    </Row>
    <!-- <Row>  Multiple select not working yet with sveltestrap, faked one below
        <Col>
            <Label for="selectUuids">Wähle</Label>
            <Input type="select" name="selector" id="selectUuids" multiple="true" bind:value={uuidsToReplace} size={availableUuids.length}>
                {#each availableUuids as uuid}
                    <option value={uuid}>
                        {uuid}
                    </option>
                {/each}
            </Input>
        </Col>
    </Row> -->
    <Row>
        <Col>
            <div class="form-group">
                <h5>Select the UUIDs to replaced:</h5>
                <select class="form-control" multiple bind:value={uuidsToReplace} size={availableUuids.length} disabled={availableUuids.length === 0} style="width: 100%;">
                    {#each availableUuids as uuid}
                        <option value={uuid}>
                            {uuid}
                        </option>
                    {/each}
                </select>
            </div>
        </Col>
    </Row>
    <Row class="mt-3">
        <Col>
            <Button disabled={uuidsToReplace.length === 0} on:click={replaceUuids} color="success">Replace selected</Button>
        </Col>
    </Row>
</Container>
