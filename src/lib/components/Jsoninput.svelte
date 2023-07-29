<script lang="ts">
  // @ts-ignore
  import { Container, Button, Badge, Row, Col, FormGroup, Icon, Input, Label } from "sveltestrap";
  
  export let recordId = 0;
  export let inputText = '';
  export let outputText;
  export let removeRecordFun;
  export let onlyOneDataRecordLeft;
  export let inputIsJson;

  $: {
    inputIsJson = isJSON(inputText);
  }

  const isJSON = (textToCheck: string): boolean => {
    try { 
           JSON.parse(textToCheck); 
           return true; 
        } 
       catch (e) { 
           return false;
        } 
  }

</script>

<Container>
    <Row>
        <Col>
            <FormGroup>
                <Label for="input1">Input {recordId}</Label>
                <Input class="font-monospace text-small" type="textarea" name="Input1" id="input1" bind:value={inputText} cols={1} rows={20} placeholder="Paste your JSON here!" style="font-size: 80%;"/>
            </FormGroup>
            Is it a JSON? 
            <Badge pill color={inputIsJson ? "success" : "danger"}>
                <Icon name={inputIsJson ? 'check-circle' : 'x-circle'}/>
            </Badge>
        </Col>
        <Col>
            <FormGroup>
                <Label for="output1">Output {recordId}</Label>
                <Input class="font-monospace" type="textarea" name="Output1" id="output1" bind:value={outputText} cols={1} rows={20} readonly style="font-size: 80%;"/>
            </FormGroup>
            <Button 
                outline 
                disabled={onlyOneDataRecordLeft}
                on:click={removeRecordFun} 
                color="info"
                size="sm"
                class="float-end"
                ><Icon name="dash-square"/> Remove section
            </Button>
        </Col>
    </Row>
</Container>
<hr>
