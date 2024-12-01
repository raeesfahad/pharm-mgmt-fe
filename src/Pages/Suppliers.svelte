<script>
  import { createQuery } from "@tanstack/svelte-query";
  import Header from "../lib/header.svelte";
  import SupplierTable from "../lib/tables/Supplier-Table.svelte";
  import { modalopen } from "../store/modal";
  import { inverntory_add_form, supplier_add_form } from "../store/form-switch";
    import { push } from "svelte-spa-router";
    import Empty from "../lib/empty.svelte";
    import ModalShell from "../lib/modal-shell.svelte";
    import FormEditInventory from "../lib/forms/form-edit-inventory.svelte";
    import FormEditSupplier from "../lib/forms/form-edit-supplier.svelte";

  const fetchSuppliers = async () => {
    const url = "http://localhost:8000/api/supplier/all";

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
    queryKey: ["suppliers"],
    queryFn: () => fetchSuppliers(),
  });
</script>

{#if $modalopen}
<ModalShell>
  <div slot="modal-content" class="flex flex-col items-center justify-center h-screen">
    <FormEditSupplier />
  </div>
</ModalShell>

{/if}


<section class="">
  <Header title="Suppliers" sub_heading={"Suppliers added to system"}>
    
    <div slot="buttons-ct" class="flex gap-1">
      <div class="mx-[25px]">
        <button
          on:click={() => {
              modalopen.set(true);
              inverntory_add_form.set(false);
              supplier_add_form.set(true);
              
          }}
          class="w-[140px] px-4 bg-gray-700 text-white h-[40px] rounded-md"
          >New Supplier</button
        >
        <button
           on:click={
            ()=>{
               push("/dashboard")
            }
           }
          class="w-[120px] px-4 bg-red-400 text-white h-[40px] rounded-md"
          >Dashboard</button
        >
      </div>
    </div>
  

  </Header>

   
  
  {#if !$query.isLoading && $query.isFetched && $query.data.length !== 0 }
  <SupplierTable data={$query.data} />

  {:else if $query.isFetched && $query.data.length < 1 }
    <Empty message="No Suppliers Available" />
  {/if}
</section>
