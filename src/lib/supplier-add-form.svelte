<script lang="ts">
  import Others from "../icons/others.svelte";
import { supplier_add_form } from "../store/form-switch";
  import { modalopen } from "../store/modal";
  import { useQueryClient } from "@tanstack/svelte-query";

  let lodaingstate: boolean = false;
  const queryClient = useQueryClient();

  let name: string;

  function AddNewMedicine(): void {
    let supplier: any = {
      name: name,
    };

    lodaingstate = !lodaingstate;
    fetch("http://localhost:8000/api/supplier/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(supplier),
    })
      .then((response) => response.json())

      .then((data) => {
        console.log("Drug added successfully:", data);
        lodaingstate = !lodaingstate;
        modalopen.set(!$modalopen);
        supplier_add_form.set(false);
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      })

      .catch((error) => {
        console.error("Error adding drug:", error);
      });
  }
</script>

<div class="w-[500px] h-[270px] bg-white rounded-lg">
  <div class="ml-[20px] pt-[15px] flex flex-row justify-between">
    <h1 class="font-bold text-2xl">Add Supplier</h1>
    <button on:click={() => {modalopen.set(!$modalopen)
        supplier_add_form.set(false)
    }} class="mx-[10px]">
     <Others render="close" />
    </button>
  </div>

  <div class="m-[20px]">
    <div class="flex flex-row gap-4 justify-center">
      <div class="flex flex-col gap-2">
        <label for="name" class="font-semibold">Supplier Name</label>
        <input
          class="p-2 border w-[450px] h-[60px] rounded-md"
          type="text"
          bind:value={name}
          placeholder="Enter Name"
        />
      </div>
    </div>

    <div class="flex flex-row gap-2 justify-center mt-[30px]">
      <button
        on:click={AddNewMedicine}
        disabled={lodaingstate}
        class="w-[250px] h-[50px] px-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400"
        >{lodaingstate ? "Loading..." : "Add Supplier"}</button
      >
    </div>
  </div>
</div>
