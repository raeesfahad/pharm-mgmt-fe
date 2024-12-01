<script lang="ts">
  import { useQueryClient } from "@tanstack/svelte-query";
  import axios from "axios";
  import Others from "../../icons/others.svelte";
  import { writable, type Writable } from "svelte/store";
    import { modalopen } from "../../store/modal";

   let item_id : Writable<string> = writable()
    var overlay_active : boolean;

  const queryClient = useQueryClient();

  async function deleteMed(id: string): Promise<void> {
    const url = `http://localhost:8000/api/drugs/delete/${id}`;

    try {
      const response = await axios.delete(url);

      if (response.status === 200) {
        overlay_active = false
        queryClient.refetchQueries({ queryKey: ["drugs"] });
        

      }
    } catch (error) {
      console.error(error);
    }
  }

  export let table_for;
  export let data: any;



  function switchOverlay():void{
     overlay_active = true
  }

</script>
{#if overlay_active}
<div class="fixed inset-0 bg-gray-900 bg-opacity-90 z-50">
    <!--first form-->
    <div class="flex flex-row justify-center mt-[200px]">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow">
          <button
            on:click={() => (overlay_active = !overlay_active)}
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
            <div class="h-7">

            </div>
            <h3 class="mb-5 text-lg font-normal text-gray-500">
              Do you want to delete this Item?
            </h3>
            <button
              on:click={async()=>{
                 await deleteMed($item_id)
              }}
              type="button"
              class="text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-6 py-2.5 text-center"
            >
              Delete
            </button>
            <button
              on:click={() => {
                overlay_active = !overlay_active;
              }}
              type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-red-200 hover:bg-red-100 hover:text-white-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              >No, cancel</button
            >
          </div>
        </div>
      </div>
    </div>
</div>
{/if}
<div
  class="w-[1020px] mx-[20px] bg-white shadow-lg rounded-md border border-gray-200"
>
  <header class="px-5 py-4 border-b border-gray-100">
    <h2 class="font-semibold text-gray-800">
      {table_for}
    </h2>
  </header>
  <div class="p-3">
    <div class="overflow-x-auto">
      <table class="table-auto w-full">
        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
          <tr>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">ID</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Name</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Quantity</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Expiry</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Price</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-center">Supplier</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-center">Actions</div>
            </th>
          </tr>
        </thead>
        <tbody class="text-sm divide-y divide-gray-100">
          {#each data.data as medicine}
            <tr>
              <td class="p-2 whitespace-nowrap">
                <div class="text-center">{medicine.id}</div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="font-medium text-center text-gray-800">
                    {medicine.name}
                  </div>
                </div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="text-left">{medicine.stock}</div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="text-left">{medicine.expiry}</div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="text-left font-medium text-green-500">
                  PKR {medicine.price}
                </div>
              </td>
              <td class="p-2 whitespace-nowrap">
                {#if medicine.supplier}
                  <div class="text-center font-medium text-gray-700">
                    {medicine.supplier.name}
                  </div>
                {/if}
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="text-lg text-center">
                  <button class="space-x-1" on:click={() => {
                     modalopen.set(!$modalopen);
                  }}>
                    <Others render="edit" />
                  </button>
                  <button
                    on:click={()=>{
                      switchOverlay()
                      item_id.set(medicine.id);
                    }}
                  >
                    <Others render="del" />
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
