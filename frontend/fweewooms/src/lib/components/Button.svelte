<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  let { children, class: className, ...props }: HTMLButtonAttributes = $props();
</script>

<button
  class={[
    "border-primary text-primary cursor-pointer rounded-md border p-2 font-bold",
    className,
  ]}
  {...props}
>
  {#if children}
    {@render children()}
  {/if}
</button>
