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
	<!-- TODO check for Bootstrap 5 version! <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/cosmo/bootstrap.min.css"/> -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"/>
</svelte:head>