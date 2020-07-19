<script>
	import { Navbar, NavbarBrand, Badge, Col, Container, Row} from "sveltestrap";
	import Jsoninput from './Jsoninput.svelte';
</script>

<style>


</style>

<Navbar color="primary" dark expand="md">
	<NavbarBrand>
		UUIDTool <Badge class="badge-pill">V0.5</Badge>
	</NavbarBrand>
</Navbar>

<Jsoninput/>

<svelte:head>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.0/cosmo/bootstrap.min.css" />
</svelte:head>