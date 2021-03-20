<script>
// @ts-check

  import { Container, Row, Col, Button, Form, FormGroup, FormText, Input, Label, Jumbotron, ListGroup, ListGroupItem } from "sveltestrap";
  
  import Uuidfinder, {findUuids} from './utils/Uuidfinder.svelte';
  import {createUuid} from './utils/uuidcreator';
  import {sampleJSON1, sampleJSON2, sampleJSON3} from './utils/samplejson';
  
  let textInput1;
  let textInput2;
  let textInput3;
  let inputJson = {"input1": {}, "input2": {}, "input3": {}};
  let uuidsFound = {};
  let uuidsToReplace = [];
  let outputJson = {"input1": {}, "input2": {}, "input3": {}};
  let outputObj1;
  let outputObj2;
  let outputObj3;

  const clearOrCopy = (whatToDo) => {

      console.log("clearorcopy");

      if (whatToDo === 'copy') {
            let newInputJson = JSON.parse(JSON.stringify(outputJson));
            textInput1 = JSON.stringify(newInputJson.input1, null, 2);
            textInput2 = JSON.stringify(newInputJson.input2, null, 2);
            textInput3 = JSON.stringify(newInputJson.input3, null, 2);
      } else {
            textInput1 = "";
            textInput2 = "";
            textInput3 = "";
      }

    uuidsFound = {};
    uuidsToReplace = [];
    outputJson = {"input1": {}, "input2": {}, "input3": {}};
  }


  $: input1IsJson = isJSON(textInput1, "input1");
  $: input2IsJson = isJSON(textInput2, "input2");
  $: input3IsJson = isJSON(textInput3, "input3");

  const isJSON = (textToCheck, field) => {

       try { JSON.parse(textToCheck); 
            inputJson[field] = JSON.parse(textToCheck);
            return true; } 
       catch (e) { 
           inputJson[field] = {};
           return false;
        } 
  };

  const setSampleInput = () => {
      textInput1 = JSON.stringify(sampleJSON1, null, 2);
      textInput2 = JSON.stringify(sampleJSON2, null, 2);
      textInput3 = JSON.stringify(sampleJSON3, null, 2);
  }

  const findUuidsInInput = () => {
      uuidsFound = findUuids(inputJson);
  }

  $: availableUuids = Object.keys(uuidsFound);

  $: uuidsFoundArray = uuidsFoundToArray(availableUuids);

  const uuidsFoundToArray = (availableUuidsInput) => {

      let workArray = [];

      for (var item in availableUuidsInput) {

          let workItem = {};

          workItem.uuid = availableUuidsInput[item];
          workItem.path = uuidsFound[availableUuidsInput[item]].paths;

          workArray.push(workItem);

      }

      return workArray;
  }

  $: selectedUuids = uuidsToReplace;

  const replaceUuids = () => {

      //deep cloning absolutely needed
      const workJSON = JSON.parse(JSON.stringify(inputJson));

      for (var item in selectedUuids) {

          let allPaths = uuidsFound[selectedUuids[item]].paths;
          let newUuid = createUuid();
          
          for (var pathItem in allPaths) {

            let splitter = allPaths[pathItem].split('.');

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

/* large devices */
@media (min-width: 1200px) {
    :global(Container) {
        max-width: 1200px;
    }
}

/* extra large devices */
@media screen and (min-width: 1800px) {
    :global(Container) {
        max-width: 1800px;
    }
}


</style>

<Container class="mt-4">
    <Row>
        <Col>
            <Button color="secondary" on:click={setSampleInput}>Sample JSON</Button>
        </Col>
        <Col>
            <Button color="info" on:click={() => clearOrCopy('copy')} class="accent-button">Copy Output to Input</Button>
        </Col>
    </Row>
</Container>

<hr>

<Container class="maxsize">
    <Row>
        <Col>
            <FormGroup>
                <Label for="input1">Input 1</Label>
                <Input class="text-monospace text-small" type="textarea" name="Input1" id="input1" bind:value={textInput1} cols="1" rows="20" placeholder="Paste your JSON here!" style="font-size: 80%;"/>
            </FormGroup>
            Is it a JSON? {input1IsJson}
        </Col>
        <Col>
            <FormGroup>
                <Label for="output1">Output 1</Label>
                <Input class="text-monospace" type="textarea" name="Output1" id="output1" bind:value={outputObj1} cols="1" rows="20" readonly style="font-size: 80%;"/>
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
                <Input class="text-monospace" type="textarea" name="Input2" id="input2" bind:value={textInput2} cols="1" rows="20" placeholder="Paste your JSON here!" style="font-size: 80%;"/>
            </FormGroup>
            Is it a JSON? {input1IsJson}
        </Col>
        <Col>
            <FormGroup>
                <Label for="output2">Output 2</Label>
                <Input class="text-monospace" type="textarea" name="Output2" id="output2" bind:value={outputObj2} cols="1" rows="20" readonly style="font-size: 80%;"/>
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
                <Input class="text-monospace" type="textarea" name="Input3" id="input3" bind:value={textInput3} cols="1" rows="20" placeholder="Paste your JSON here!" style="font-size: 80%;"/>
            </FormGroup>
            Is it a JSON? {input1IsJson}
        </Col>
        <Col>
            <FormGroup>
                <Label for="output2">Output 3</Label>
                <Input class="text-monospace" type="textarea" name="Output3" id="output3" bind:value={outputObj3} cols="1" rows="20" readonly style="font-size: 80%;"/>
            </FormGroup>
        </Col>
    </Row>
</Container>

<hr>

<Container>
    <Row>
        <Col class="mr-auto">
            <Button color="primary" disabled={!input1IsJson && !input2IsJson && !input3IsJson} on:click={findUuidsInInput}>Finde UUIDs</Button>
            <Button color="secondary" on:click={() => clearOrCopy('clear')}>Reset</Button>
        </Col>
    </Row>
    <Row>
        <Col class="mt-4">
            <h5>Found UUIDs and their path:</h5>
            <ul>
                {#each uuidsFoundArray as mainItem}
                    <li>{mainItem.uuid}
                        <ul>
                            {#each mainItem.path as subItem}
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
                <select class="form-control" multiple bind:value={uuidsToReplace} size={availableUuids.length} style="width: 100%;">
                    {#each availableUuids as uuid}
                        <option value={uuid}>
                            {uuid}
                        </option>
                    {/each}
                </select>
            </div>
        </Col>
    </Row>
    <Row>
        <Col>
            <Button disabled={uuidsToReplace.length === 0} on:click={replaceUuids} color="success">Replace selected</Button>
        </Col>
    </Row>
</Container>
