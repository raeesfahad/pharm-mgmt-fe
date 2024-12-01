<script lang="ts">
    import Others from "../../icons/others.svelte";


    export let data : any;
    export let table_for : string;
    export let removeMed : any ;
      
  

</script>
<div
class="w-[1030px] mx-[20px] bg-white shadow-lg rounded-md border border-gray-200"
>
<header class="px-5 py-4 border-b border-gray-100">
  <h2 class="font-semibold text-gray-800">{table_for}</h2>
</header>
<div class="p-3">
  <div class="overflow-x-auto">
    <table class="table-auto w-full">
      <thead
        class="text-xs font-semibold uppercase text-gray-400 bg-gray-50"
      >
        <tr>
          <th class="p-2 whitespace-nowrap">
            <div class="font-semibold text-left">Name</div>
          </th>
          <th class="p-2 whitespace-nowrap">
            <div class="font-semibold text-left">Quantity</div>
          </th>
          <th class="p-2 whitespace-nowrap">
            <div class="font-semibold text-left">Price</div>
          </th>
          <th class="p-2 whitespace-nowrap">
            <div class="font-semibold text-center">Actions</div>
          </th>
        </tr>
      </thead>
      <tbody class="text-sm divide-y divide-gray-100">
      {#each data as medicine, i}
        <tr>
          <td class="p-2 whitespace-nowrap">
            <div class="flex items-center">
              <div class="font-medium text-gray-800">{medicine.name}</div>
            </div>
          </td>
          <td class="p-2 whitespace-nowrap">
            <div class="text-left">{medicine.quantity}</div>
          </td>
          <td class="p-2 whitespace-nowrap">
            <div class="text-left font-medium text-green-500">
              PKR {medicine.price}
            </div>
          </td>

          <td class="p-2 whitespace-nowrap">
            <div class="text-lg text-center">
                <button on:click={() => removeMed(i)}>
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