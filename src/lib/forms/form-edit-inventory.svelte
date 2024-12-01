<script lang="ts">
    import { createQuery, useQueryClient } from "@tanstack/svelte-query";
    import { modalopen } from "../../store/modal";
    import Others from "../../icons/others.svelte";

  
    let lodaingstate : boolean = false
    const queryClient = useQueryClient();
  
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
  
    let name: string;
    let expiry: string;
    let supplier: string;
    let quantity: number;
    let price: number;
  
  
    function AddNewMedicine(): void {
       
    let medicine: any = {
      name: name,
      expiry: expiry,
      manufacturer : "Generic",
      stock: quantity,
      price: price,
      supplier_id: supplier,
    };
  
      lodaingstate = !lodaingstate;
      fetch("http://localhost:8000/api/drugs/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
  
        body: JSON.stringify(medicine),
      })
        .then((response) => response.json())
  
        .then((data) => {
          console.log("Drug added successfully:", data);
          lodaingstate = !lodaingstate
          modalopen.set(!$modalopen)
          queryClient.invalidateQueries({ queryKey: ["drugs"] });
        })
  
        .catch((error) => {
          console.error("Error adding drug:", error);
        });
    }
  
  </script>
  
  <div class="w-[750px] h-[450px] bg-white rounded-lg">
    <div class="ml-[20px] pt-[20px] flex flex-row justify-between">
      <h1 class="font-bold text-2xl">Edit Drug</h1>
      <button on:click={() => {
        modalopen.set(!$modalopen)
  
      } } class="mx-[10px]">
        <Others render="close" />
      </button>
    </div>
  
    <div class="m-[20px]">
      <div class="flex flex-row gap-4 justify-center">
        <div class="flex flex-col gap-2">
          <label for="name" class="font-semibold">Medicine Name</label>
          <input
            class="p-2 border w-[350px] h-[60px] rounded-md"
            type="text"
            bind:value={name}
            placeholder="Enter Name"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="name" class="font-semibold">Expiry Date</label>
          <input
            bind:value={expiry}
            class="p-2 border w-[350px] h-[60px] rounded-md"
            type="date"
            placeholder="Expiry Date"
          />
        </div>
      </div>
      <div class="flex flex-row gap-2 justify-center">
        <div class="flex flex-col gap-2">
          <label for="name" class="font-bold">Supplier</label>
          {#if $query.data}
            <select
              bind:value={supplier}
              class="p-2 border w-[350px] h-[60px] rounded-md bg-inherit"
            >
              <option value="">Please Select</option>
              {#each $query.data as supplier}
                <option value={supplier.id}>{supplier.name}</option>
              {/each}
            </select>
          {/if}
        </div>
        <div class="flex flex-col gap-2">
          <label for="name" class="font-bold">Quantity</label>
          <input
            class="p-2 border w-[350px] h-[60px] rounded-md"
            type="number"
            bind:value={quantity}
            min={0}
            placeholder="Quantity"
          />
        </div>
      </div>
      <div class="flex flex-row gap-2 justify-center">
        <div class="flex flex-col gap-2">
          <label for="name" class="font-bold">Price</label>
          <input
            class="p-2 border w-[700px] h-[60px] rounded-md"
            type="number"
            bind:value={price}
            min="0"
            placeholder="Price"
          />
        </div>
      </div>
  
      <div class="flex flex-row gap-2 justify-center mt-[20px]">
        <button
          on:click={AddNewMedicine}
          disabled={lodaingstate}
          class="w-[250px] h-[50px] px-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400"
          >{lodaingstate ? "Loading..." : "Edit Drug"}</button
        >
      </div>
    </div>
  </div>
  