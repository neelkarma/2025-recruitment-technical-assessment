<script lang="ts">
  import { MediaQuery } from "svelte/reactivity";

  let {
    name,
    roomsAvailable,
    image,
  }: { name: string; roomsAvailable: number; image: string } = $props();

  const isNotMobile = new MediaQuery("min-width: 40rem");
</script>

<div
  class="bg flex min-h-24 items-center rounded-xl bg-cover p-4 bg-blend-darken sm:min-h-80 sm:flex-col-reverse"
  style="--image: url({image})"
>
  <span
    class="sm:bg-primary rounded-xl font-bold text-white sm:self-start sm:p-4"
    >{name}</span
  >
  <span class="grow"></span>
  <div
    class="flex items-center gap-2 rounded-full bg-white px-3 py-2 sm:self-end"
  >
    <div class="bg-available size-3 rounded-full"></div>
    <span class="font-bold text-black">
      {#if isNotMobile.current}
        {roomsAvailable} rooms available
      {:else}
        {roomsAvailable} / {roomsAvailable}
      {/if}
    </span>
  </div>
</div>

<style>
  .bg {
    background: rgba(0, 0, 0, 0.35) var(--image);
  }

  @media (min-width: 40rem) {
    .bg {
      background: var(--image);
    }
  }
</style>
