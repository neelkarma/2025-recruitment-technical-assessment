<script lang="ts">
  import "../app.css";
  import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
  import "@fortawesome/fontawesome-free/css/solid.min.css";
  import NavBar from "$lib/components/NavBar.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <title>Freerooms</title>
</svelte:head>

<div class="flex flex-col">
  <NavBar />
  {@render children()}
</div>
