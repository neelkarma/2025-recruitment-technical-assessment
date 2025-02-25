<script lang="ts">
  import Button from "./Button.svelte";
  import Logo from "./Logo.svelte";
</script>

<nav class="flex items-center border-b border-gray-300 px-2 py-1">
  <a href="/" class="flex items-center">
    <Logo />
    <h1 class="text-primary hidden text-3xl font-bold sm:inline">Freerooms</h1>
  </a>
  <span class="grow"></span>
  <div class="flex items-center gap-2">
    <Button class="px-3"><i class="fa-solid fa-search"></i></Button>
    <Button class="bg-primary px-3 text-white"
      ><i class="fa-solid fa-border-all"></i></Button
    >
    <Button class="px-3"><i class="fa-solid fa-map"></i></Button>
    <Button class="px-3"><i class="fa-solid fa-moon"></i></Button>
  </div>
</nav>
