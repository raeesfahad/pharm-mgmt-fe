<script lang="ts">
  import Sidebar from "./sidebar.svelte";
  import Router, { location } from "svelte-spa-router";
  import {  routes } from "../Pages/routes";
  import { modalopen } from "../store/modal";
  import ModalShell from "./modal-shell.svelte";
  import FormAddInventory from "./form-add-inventory.svelte";
  import { loggedIn } from "../store/login";
  import { inverntory_add_form, supplier_add_form } from "../store/form-switch";
  import SupplierAddForm from "./supplier-add-form.svelte";



  //let UserMode : boolean = true;

  let LoginFail: boolean;

  function LoginFailed(event: any): void {
    if(!$loggedIn){
    LoginFail = true;
     window.location.href = "/#/login"
    }
  }
</script>

  {#if $modalopen}
    <ModalShell>
      <div slot="modal-content">
        <div class="flex flex-col items-center justify-center h-screen">
        {#if $inverntory_add_form}
          <FormAddInventory />
         {/if}

        {#if $supplier_add_form}
         <SupplierAddForm />
        {/if}
        </div>
    </ModalShell>
  {/if}




    <main class="flex flex-row h-screen">
      {#if $location !== "/" && $location !== "/login" && $location !== "/order"}
      <div class="w-[275px] h-screen">    
        <Sidebar />
      </div>
      {/if}
      <div class="flex-1 overflow-y-auto">
        <div class="h-full w-full bg-[#F7F7F7]">
          <Router {routes} on:conditionsFailed={LoginFailed} />
        </div>
      </div>
      </main>

  

