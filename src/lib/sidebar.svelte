<script lang="ts">
  import Logo from "./../assets/pharm.png";
  import "boxicons";
  import Sideitem from "./sideitem.svelte";
  import { link } from "svelte-spa-router";
  import { location } from "svelte-spa-router";
    import Pieicon from "../icons/pieicon.svelte";
    import Invicon from "../icons/invicon.svelte";
    import Suppicon from "../icons/suppicon.svelte";
    import Presicon from "../icons/presicon.svelte";

</script>

<div class="bg-white space-y-14 fixed">
  <div class="mt-[30px] mx-[20px]">
    <img src={Logo} alt="Logo" width="140" />
  </div>

  <div class="w-[250px] h-[400px] mx-[15px]">
    <div class="flex flex-col gap-2">
      <a use:link href="/dashboard" class="flex items-center justify-center">
        <Sideitem name="Dashboard" active={$location === "/dashboard" || $location === "/sale/new"}>
          <div slot="icon">
           <Pieicon active={$location === "/dashboard" || $location === "/sale/new"} />
          </div>
        </Sideitem>
      </a>
      <a use:link href="/inventory" class="flex items-center justify-center">
        <Sideitem name="Inventory" active={$location === "/inventory"}>
          <div slot="icon">
            <Invicon active={$location === "/inventory"} />
          </div>
        </Sideitem>
      </a>
      <a use:link href="/supplier" class="flex items-center justify-center">
        <Sideitem name="Suppliers" active={$location === "/supplier"}>
          <div slot="icon">
            <Suppicon active={$location === "/supplier"} />
          </div>
        </Sideitem>
      </a>
      <a use:link href="/staff" class="flex items-center justify-center">
        <Sideitem name="Prescriptions" active={$location === "/staff" || $location === "/invoice/:id"}>
          <div slot="icon">
          <Presicon active={$location === "/staff" || $location === "/invoice/:id"} />
        </div>
        </Sideitem>
      </a>
    </div>
  </div>
</div>
