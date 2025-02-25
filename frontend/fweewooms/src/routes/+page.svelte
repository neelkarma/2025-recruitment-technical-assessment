<script lang="ts">
  import agsm from "../assets/agsm.webp";
  import ainsworth from "../assets/ainsworth.webp";
  import anita from "../assets/anitab.webp";
  import bio from "../assets/biologicalScience.webp";
  import biowest from "../assets/biologicalScienceWest.webp";
  import blockhouse from "../assets/blockhouse.webp";
  import business from "../assets/businessSchool.webp";
  import civil from "../assets/civilBuilding.webp";
  import colombo from "../assets/colombo.webp";
  import cse from "../assets/cseBuilding.webp";

  import BuildingCard from "$lib/components/BuildingCard.svelte";
  import OmniBar from "$lib/components/OmniBar.svelte";
</script>

<div class="flex flex-col gap-2 p-2">
  <OmniBar />
  <div
    class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    <BuildingCard name="AGSM" roomsAvailable={9} image={agsm} />
    <BuildingCard
      name="Ainsworth Building"
      roomsAvailable={16}
      image={ainsworth}
    />
    <BuildingCard
      name="Anita B Lawrence Centre"
      roomsAvailable={44}
      image={anita}
    />
    <BuildingCard name="Biological Sciences" roomsAvailable={6} image={bio} />
    <BuildingCard
      name="Biological Sciences (West)"
      roomsAvailable={8}
      image={biowest}
    />
    <BuildingCard name="Blockhouse" roomsAvailable={42} image={blockhouse} />
    <BuildingCard name="Business School" roomsAvailable={18} image={business} />
    <BuildingCard
      name="Civil Engineering Building"
      roomsAvailable={8}
      image={civil}
    />
    <BuildingCard name="Colombo Building" roomsAvailable={5} image={colombo} />
    <BuildingCard
      name="Computer Science & Eng (K17)"
      roomsAvailable={7}
      image={cse}
    />
  </div>
</div>
