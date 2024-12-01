<script lang="ts">
  import Header from "../header.svelte";
  import * as pdfMake from "pdfmake/build/pdfmake";
  import html2canvas from "html2canvas";
  import { tick } from "svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import { pop } from "svelte-spa-router";

  export let params = {}

  const url = `http://localhost:8000/api/prescription/get/${params.id}`;

  async function downloadPdf(): Promise<void> {
    // Wait for the DOM to update

    await tick();

    const element = document.getElementById("invoice");

    if (!element) {
      console.error("Invoice element not found");

      return;
    }

    try {
      const canvas = await html2canvas(element);

      const imgData = canvas.toDataURL("image/png");

      const docDefinition = {
        content: [
          {
            image: imgData,
            width : 450
          },
        ],
      };

      pdfMake.createPdf(docDefinition).print();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }

  const fetchDrugs = async () => {


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
    queryKey: ["invoice"],
    queryFn: () => fetchDrugs(),
  });  

  $: total = $query.data ? $query.data.drugs.reduce((sum : any, drug : any) => sum + parseFloat(drug.price), 0) : 0;
</script>

<Header title="Print Invoice" sub_heading="Invoice for User">
  <div slot="buttons-ct" class="mt-[30px] flex flex-row gap-1">
    <div class="mx-[25px] mt-[10px]">
      <button
        on:click={() => {
          downloadPdf();
        }}
        class="w-[160px] px-4 bg-gray-700 text-white h-[40px] rounded-md"
        >Print Invoice</button
      >
      <button
      on:click={() => {
        pop();
      }}
      class="w-[160px] px-4 bg-red-400 text-white h-[40px] rounded-md"
      >Back</button
    >
    </div>
  </div></Header
>

 {#if $query.isLoading}

  <h2>Loading.....</h2>

 {:else}



<div class="mx-[25px] mt-[10px]" id="invoice">
  <div class="container mx-auto font-sans bg-gray-100">
    <div class="bg-white rounded-lg shadow-md p-8 mt-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Invoice</h1>
        <div class="text-gray-600">Invoice #{params.id}</div>
      </div>
      <div class="flex justify-between items-center mb-6">
        <div>
          <div class="font-bold">From:</div>
          <div class="text-gray-600 font-bold">{"Administrator"}</div>
          <div class="text-gray-600">Example Pharmacy</div>
          <div class="text-gray-600">DHQ Hospital Chitral</div>
        </div>
        <div>
          <div class="font-bold">To:</div>
          <div class="text-gray-600">{$query.data.patient_name}</div>
          <div class="text-gray-600">Chitral, Anytown</div>
          <div class="text-gray-600">Anytown, KPK Pakistan</div>
        </div>
      </div>
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="text-left py-2">Description</th>
            <th class="text-left py-2">Quantity</th>
            <th class="text-right py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
            {#if $query.data}
            {#each $query.data.drugs as drug}
          <tr>
            <td class="border-t py-2">{drug.name}</td>
            <td class="border-t py-2">{drug.quantity}</td>
            <td class="border-t text-right py-2">PKR {drug.price}</td>
          </tr>
          {/each}
          {/if}
        </tbody>
        <tfoot>
          <tr>
            <td class="border-t font-bold py-2"></td>
            <td class="border-t font-bold py-2"></td>
            <td class="border-t font-bold text-right py-2">PKR {total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</div>
{/if}
