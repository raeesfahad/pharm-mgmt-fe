<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import Header from "../lib/header.svelte";
  import Table from "../lib/tables/table.svelte";
  import { push } from "svelte-spa-router";

  export let params = {};

  const fetchDrugs = async () => {
    const url = "http://localhost:8000/api/drugs/all?limit=5";

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

  let overlay: boolean = false;
  let meds_data: any = [];
  let api_loading: boolean = false;

  let med_name: string;
  let quantity: string;
  let price: string;
  let doctor: string;
  let patient: string;
  let pres_date: string;

  let med_form: boolean = false;
  let pres_form: boolean = false;

  function addMed(): void {
    let med: any = {
      name: med_name,
      quantity: quantity,
      price: price,
    };

    meds_data = [med, ...meds_data];

    overlay = !overlay;
  }

  function removeMed(index: number): void {
    meds_data = meds_data.filter((med: any, i: number) => i !== index);
  }

  function showMedForm(): void {
    med_form = true;
    pres_form = false;
  }

  function showPresForm(): void {
    med_form = false;
    pres_form = true;
  }

  function addPrescreption(): void {
    let url = `http://localhost:8000/api/prescription/edit/${params.id}`;
    api_loading = true;

    let prescription = {
      admin_uploaded: true,
      drugs: meds_data,
    };

    fetch(url, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(prescription),
    })
      .then((response) => response.json())

      .then((data) => {
        overlay = !overlay;
        api_loading = false;
        meds_data = [];
        push("/staff");
      })

      .catch((error) => console.error("Error:", error));
  }

  function handleMedChange(): void {
    const selectedMed = $query.data.data.find((med) => med.name === med_name);
    console.log(selectedMed);
    price = selectedMed.price; // Update the price variable
  }
</script>

<Header
  title={`Approve Prescription ${params.id}`}
  sub_heading="Approve a new Prescription"
>
  <div slot="buttons-ct" class="mt-[30px] flex flex-row gap-1">
    <div class="mx-[25px] mt-[10px]">
      <button
        on:click={() => {
          overlay = !overlay;
          showMedForm();
        }}
        class="w-[160px] px-4 bg-gray-700 text-white h-[40px] rounded-md"
        >Add Medicine</button
      >
      <button
        on:click={() => {
          overlay = !overlay;
          showPresForm();
        }}
        class="w-[100px] px-4 bg-red-400 text-white h-[40px] rounded-md"
        >Complete</button
      >
    </div>
  </div>
</Header>

{#if overlay}
  <div class="fixed inset-0 bg-gray-900 bg-opacity-90 z-50">
    {#if pres_form}
      <!--first form-->
      <div class="flex flex-row justify-center mt-[200px]">
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow">
            <button
              on:click={() => (overlay = !overlay)}
              class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
              <svg
                class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500">
                Do you want to Approve this Prescription?
              </h3>
              <button
                on:click={addPrescreption}
                type="button"
                class="text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Add Prescription
              </button>
              <button
                on:click={() => {
                  overlay = !overlay;
                }}
                type="button"
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-red-200 hover:bg-red-100 hover:text-white-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >No, cancel</button
              >
            </div>
          </div>
        </div>
      </div>
    {/if}
    <!--second form-->
    {#if med_form}
      <div class="py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10"
          >
            <div class="max-w-md mx-auto">
              <div class="flex items-center space-x-5">
                <div
                  class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono"
                >
                  i
                </div>
                <div
                  class="block pl-2 font-semibold text-2xl self-start text-gray-700"
                >
                  <h2 class="leading-relaxed">Add a Medicine</h2>
                </div>
              </div>
              <div class="divide-y divide-gray-200 w-[400px]">
                <div
                  class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                >
                  <div class="flex flex-col">
                    <label for="" class="leading-loose">Medicine Name</label>
                    <select
                      bind:value={med_name}
                      on:change={handleMedChange}
                      class="p-2 bg-inherit rounded-md border"
                    >
                      {#each $query.data.data as med}
                        <option value={med.name}>{med.name}</option>
                      {/each}
                    </select>
                  </div>
                  <div class="flex flex-col">
                    <label for="" class="leading-loose">Quantity</label>
                    <input
                      bind:value={quantity}
                      type="text"
                      class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Optional"
                    />
                  </div>
                  <div class="flex flex-col">
                    <label for="" class="leading-loose">Price</label>
                    <input
                      bind:value={price}
                      type="text"
                      class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder={price}
                    />
                  </div>
                </div>
                <div class="pt-4 flex items-center space-x-4">
                  <button
                    on:click={() => {
                      overlay = !overlay;
                    }}
                    class="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                  >
                    <svg
                      class="w-6 h-6 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path></svg
                    > Cancel
                  </button>
                  <button
                    on:click={addMed}
                    class="bg-gray-700 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                    >Done</button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

{#key meds_data}
  <Table table_for="Medicine Added" data={meds_data} {removeMed} />
{/key}
