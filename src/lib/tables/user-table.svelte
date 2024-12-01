<script lang="ts">
  import { push } from "svelte-spa-router";
  import Badge from "../badge.svelte";
  import Others from "../../icons/others.svelte";

  export let data: any;
  let displayfrom: boolean = false;
  export let table_for: string;
  export let deleteDrug: any;
  let print: boolean = false;
</script>

<div
  class="w-[1020px] mx-[20px] bg-white shadow-lg rounded-md border border-gray-200"
>
  <header class="px-5 py-4 border-b border-gray-100">
    <h2 class="font-semibold text-gray-800">{table_for}</h2>
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
              <div class="font-semibold text-left">Patient Name</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Patient Phone</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Prescription Date</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Added By</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">Medicines</div>
            </th>
            <th class="p-2 whitespace-nowrap">
              <div class="font-semibold text-center">File</div>
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
                <div class="flex items-center">
                  <div class="font-medium text-gray-800">{medicine.id}</div>
                </div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="text-left">{medicine.patient_name}</div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="text-left font-medium text-green-500">
                  {medicine.patient_phone ? medicine.patient_phone : "N/A"}
                </div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="text-left font-medium text-green-500">
                  {medicine.prescription_date
                    ? medicine.prescription_date
                    : "N/A"}
                </div>
              </td>

              <td class="p-2 whitespace-nowrap">
                <div class="text-left font-medium text-green-500">
                  <Badge is_admin={medicine.admin_uploaded} />
                </div>
              </td>

              {#if medicine.drugs}
                <td class="p-2 whitespace-nowrap">
                  <div class="text-left font-medium text-green-500">
                    {medicine.drugs.length}
                    {medicine.drugs.length > 1 ? "items" : "item"}
                  </div>
                </td>
              {/if}

              <td class="p-2 whitespace-nowrap">
                <div class="font-medium text-green-500 text-center">
                  {#if medicine.files.length > 0}
                    <button
                      on:click={() => {
                        window.open(
                          `http://localhost:8000/files/${medicine.files[0].file_path}`,
                          "_blank",
                        );
                      }}>View</button
                    >
                  {:else}
                    "N/A"
                  {/if}
                </div>
              </td>

              <td class="p-2 whitespace-nowrap">
                <div class="text-lg text-center space-x-1">
                  {#if medicine.admin_uploaded}
                    <button
                      on:click={() => {
                        push(`/invoice/${medicine.id}`);
                      }}
                    >
                      <Others render="recipt" />
                    </button>
                  {:else}
                    <button
                      on:click={() => {
                        push(`/prescription/${medicine.id}`);
                      }}
                    >
                      <Others render="check" />
                    </button>
                  {/if}

                  <button
                    on:click={() => {
                      deleteDrug(medicine.id);
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
