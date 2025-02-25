<script lang="ts">
  import logoOpen from "../../assets/freeRoomsLogo.png";
  import logoClosed from "../../assets/freeroomsDoorClosed.png";

  let isOpen = $state(true);
</script>

<button class="cursor-pointer" onclick={() => (isOpen = !isOpen)}>
  <img
    src={isOpen ? logoOpen : logoClosed}
    alt="Freerooms Logo"
    class="max-h-12"
  />
</button>
