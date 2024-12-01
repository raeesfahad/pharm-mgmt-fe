<script lang="ts">
    import { push } from "svelte-spa-router";
  import Header from "../lib/header.svelte";
  import InventoryTable from "../lib/tables/Inventory-table.svelte";
  import { inverntory_add_form } from "../store/form-switch";
  import { modalopen } from "../store/modal";
  import { createQuery } from "@tanstack/svelte-query";
    import Empty from "../lib/empty.svelte";
    import ModalShell from "../lib/modal-shell.svelte";
    import FormEditInventory from "../lib/forms/form-edit-inventory.svelte";


  

  const fetchDrugs = async () => {
    const url = "http://localhost:8000/api/drugs/all";

    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const drugs = await response.json();

      return drugs;
    } catch (error) {
      console.error("Error fetching drugs:", error);

      throw error;
    }
  };

  const query = createQuery({
    queryKey: ["drugs"],
    queryFn: () => fetchDrugs(),
  });

</script>

{#if $modalopen}
<ModalShell>
   <div class="flex flex-col items-center justify-center h-screen" slot="modal-content">
    <FormEditInventory />
   </div>
  
</ModalShell>
{/if}

<section class="">
  <div class="w-full">
    <Header
      title="Inventory"
      sub_heading={$query.isLoading
        ? "Loading your inventory...."
        : "Medicines in your Inventory"}
    >
      <div class="text-white mx-[30px]" slot="buttons-ct">
        <button
          on:click={() => {
            modalopen.set(!$modalopen);
            inverntory_add_form.set(true);
          }}
          class="w-[140px] bg-gray-700 px-2 h-[40px] rounded-md"
          >Add Inventory</button
        >
        <button
          on:click={() => {
            push("/dashboard")
          }}
          class="w-[130px] bg-red-400 px-2 h-[40px] rounded-md"
          >Dashboard</button
        >
      </div>
    </Header>
  </div>

  {#if !$query.isLoading && $query.isFetched && $query.data.total !== 0}
    <InventoryTable table_for="All Medicines" data={$query.data} />

   {:else if $query.isFetched && $query.data.total < 1}
     <Empty message="No Medicines Added" />
  {/if}
</section>
