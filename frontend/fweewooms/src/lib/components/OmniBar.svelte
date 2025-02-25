<script>
  import Button from "./Button.svelte";
</script>

<div class="omnibar-grid grid gap-2">
  <Button class="flex items-center gap-2" style="grid-area: filters">
    <i class="fa-solid fa-filter"></i>
    <span>Filters</span>
  </Button>
  <div
    class="flex grow items-center gap-2 rounded-md border border-gray-300 p-2 has-[input:focus-within]:outline has-[input:focus-within]:outline-blue-600"
    style="grid-area: search"
  >
    <i class="fa-solid fa-search text-gray-500"></i>
    <input
      class="grow placeholder:text-gray-500 focus-within:outline-0"
      type="text"
      placeholder="Search"
    />
  </div>
  <Button
    class="grid-area-sort flex items-center gap-2"
    style="grid-area: sort"
  >
    <i class="fa-solid fa-arrow-up-wide-short"></i>
    <span>Sort</span>
  </Button>
</div>

<style>
  .omnibar-grid {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: min-content 1fr min-content;
    grid-template-areas:
      "search search search"
      "filters . sort";
  }

  @media (min-width: 40rem) {
    .omnibar-grid {
      grid-template-rows: 1fr;
      grid-template-columns: min-content 1fr min-content;
      grid-template-areas: "filters search sort";
    }
  }
</style>
