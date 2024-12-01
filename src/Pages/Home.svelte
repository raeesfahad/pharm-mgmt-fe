<script lang="ts">
  import { link, replace } from "svelte-spa-router";
  import Statbox from "../lib/statbox.svelte";
  import PieChart from "../lib/pie-chart.svelte";
  import Header from "../lib/header.svelte";
  import { LogOut } from "../store/login";

  import { piechart_data } from "../store/piechart";
  import BarChart from "../lib/bar_chart.svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import Loader from "../lib/loader.svelte";
  import Alert from "../lib/alert.svelte";
    import Others from "../icons/others.svelte";
  let selectedValue: string;

  function update_chart(event: any): void {
    selectedValue = event.target.value;

    piechart_data.set($query.data.chart_data);
  }

  const fetchDashboardData = async () => {
    const url = "http://localhost:8000/api/dashboard";

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
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboardData(),
  });
</script>

{#if !$query.isLoading && $query.isFetched}
  <section class="">
    {#if $query.data.user_pres > 0}
      <Alert number={$query.data.user_pres} />
    {/if}

    <Header title="Hello Administrator" sub_heading="Have a great day at work">
      <div slot="buttons-ct" class="flex flex-row gap-1">
        <div class="mx-[25px]">
          <button
            on:click={() => {
              replace("/sale/new");
            }}
            class="w-[140px] px-4 bg-gray-700 text-white h-[40px] rounded-md"
            >New Sale</button
          >
          <button
            on:click={LogOut}
            class="w-[100px] px-4 bg-red-400 text-white h-[40px] rounded-md"
            >Logout</button
          >
        </div>
      </div>
    </Header>

    <div class="flex flex-row gap-2 mt-[10px] mx-[15px]">
      {#if $query.data}
        <Statbox
          bg_class={"bg-blue-400"}
          icon_bg_class={"bg-blue-300"}
          digit={$query.data.total_drugs}
          title="Drugs Added"
        >
          <div slot="icon">
            <Others render="capsule" />
          </div>
        </Statbox>
        <Statbox
          bg_class={"bg-red-400"}
          icon_bg_class={"bg-red-300"}
          digit={$query.data.total_suppliers}
          title="Suppliers Available"
        >
        <div slot="icon">
          <Others render="supplier" />
        </div>
        </Statbox>
        <Statbox
          bg_class={"bg-orange-400"}
          icon_bg_class={"bg-orange-300"}
          digit={`PKR ${$query.data.total_sale}`}
          title="Revenue Collected"
        >
        <div slot="icon">
          <Others render="money"  />
        </div>
        </Statbox>
        <Statbox
          bg_class={"bg-indigo-400"}
          icon_bg_class={"bg-indigo-300"}
          digit={$query.data.total_prescriptions}
          title="Prescriptions"
        >
        <div slot="icon">
          <Others render="prescription" />
        </div>
        </Statbox>
      {/if}
    </div>

    <div class="grid grid-cols-2 grid-rows-1 gap-4 mx-[15px] mt-[10px]">
      <div class="flex flex-col gap-0">
        <div
          class="flex flex-row justify-between w-[520px] h-[50px] rounded-md"
        >
          <h3 class="mt-[10px] font-bold text-gray-700 text-xl">
            Stock Levels
          </h3>
          <a use:link class="mt-[15px] text-md bg-white rounded-md font-semibold px-4 h-[25px]" href="/inventory"
            >View All</a
          >
        </div>
        <div class="w-[520px] h-[380px] bg-white rounded-lg">
          {#if $query.data}
            <BarChart data={$query.data.stock} />
          {/if}
        </div>
      </div>

      <div class="flex flex-col gap-0">
        <div
          class="flex flex-row justify-between w-[500px] h-[50px] rounded-md"
        >
          <h3 class="mt-[10px] font-bold text-gray-700 text-xl">
            Most Requsted Item
          </h3>
          <select
            on:change={update_chart}
            name="time-period"
            id="time-period"
            class="w-[120px] h-[30px] px-2 mt-[10px] rounded-md bg-white"
          >
            <option value="today" selected={selectedValue === "today"}
              >Today</option
            >
            <option value="this-week" selected={selectedValue === "this-week"}
              >This Week</option
            >
            <option value="this-month" selected={selectedValue === "this-month"}
              >This Month</option
            >
            <option value="6-months" selected={selectedValue === "6-months"}
              >6 Months</option
            >
            <option value="yearly" selected={selectedValue === "yearly"}
              >Last Year</option
            >
          </select>
        </div>
        {#key $piechart_data}
          <div class="w-[500px] h-[380px] bg-white rounded-lg">
            <PieChart data={$piechart_data} />
          </div>
        {/key}
      </div>
    </div>
  </section>
 
 {#if $query.isLoading}
  <Loader />
  {/if}
{/if}
