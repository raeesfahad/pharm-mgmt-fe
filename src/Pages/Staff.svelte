<script lang="ts">
  import { push } from "svelte-spa-router";
  import Header from "../lib/header.svelte";
  import UserTable from "../lib/tables/user-table.svelte";
  import { createQuery, useQueryClient } from "@tanstack/svelte-query";
    import Empty from "../lib/empty.svelte";

  const fetchDrugs = async () => {
    const url = "http://localhost:8000/api/prescription/all";
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
    queryKey: ["presc"],
    queryFn: () => fetchDrugs(),
  });

  const queryClient = useQueryClient();

  const deleteDrug = async (id: any) => {
    const url = `http://localhost:8000/api/prescription/delete/${id}`;
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(`Drug with id ${id} deleted successfully`);

      // Invalidate query to refetch new data
      queryClient.invalidateQueries({ queryKey: ["presc"] });
    } catch (error) {
      console.error("Error deleting drug:", error);
    }
  };
</script>

<section class="">
  <Header title="All Prescriptions" sub_heading="Manage your Prescriptions">
    <div slot="buttons-ct" class="flex flex-row gap-1">
      <div class="mx-[25px]">
        <button 
        on:click={()=>{push("/dashboard")}}
        class="w-[120px] px-4 bg-red-400 text-white h-[40px] rounded-md"
          >Dashboard</button
        >
      </div>
    </div>
  </Header>

  {#if !$query.isLoading && $query.isFetched && $query.data.total !== 0}
    <UserTable data={$query.data} {deleteDrug} table_for="Prescriptions" />

    {:else if $query.isFetched && $query.data.total < 1}
    <Empty message="No Prescriptions Added"/>
  {/if}
</section>
