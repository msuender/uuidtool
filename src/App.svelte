<script lang="ts">
	import { Navbar, NavbarBrand, Badge, Col, Container, Row} from "sveltestrap";
	import Jsoninput from './Jsoninput.svelte';
</script>

<style>


</style>

<Navbar color="primary" dark expand="md">
	<NavbarBrand>
		UUIDTool <Badge class="badge-pill">V0.6</Badge>
	</NavbarBrand>
</Navbar>

<Jsoninput/>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.0.1/dist/cosmo/bootstrap.min.css"/>
</svelte:head>