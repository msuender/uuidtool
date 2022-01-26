<script lang="ts">
	import { Navbar, NavbarBrand, Badge, Icon, Popover} from "sveltestrap";
	import Toolbody from './components/Toolbody.svelte';
</script>

<style>


</style>

<Navbar color="primary" dark expand="md">
	<NavbarBrand>
		UUIDTool <Badge class="badge-pill">V 0.7</Badge>
		<Icon id="page-info" name="info-square"/>
			<Popover
				trigger="hover"
				placement="right"
				target="page-info"
				title="Tool Info"
			>
				Built with Svelte and Bootstrap 5.0<br>
				Implemented using Typescript and Sveltestrap.
			</Popover>
	</NavbarBrand>
</Navbar>

<Toolbody/>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.0.1/dist/cosmo/bootstrap.min.css"/>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
</svelte:head>