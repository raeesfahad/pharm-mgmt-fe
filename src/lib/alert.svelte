<script lang="ts">
    import { push } from "svelte-spa-router";
    import Others from "../icons/others.svelte";

   
   export let number : any;
    
   let close_alert : boolean = false
 

</script>

{#if !close_alert}
<div class="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 space-x-2">
    <box-icon name='bell' color="gray" size="sm"> </box-icon>
    <div class="flex flex-row justify-between w-full">
    <span class="font-semibold">
       There { number >= 1 ? "is" : "are"} {number} {number >= 1 ? "prescription" : "prescriptions"} waiting for approval
    </span>


    <div class=" flex flex-row align-center gap-4">
        <button class="px-4 py-0.5 border border-gray-600 text-gray-600 rounded-lg" on:click={()=>{
            push("/staff")
        }}>View</button>

        <button
        on:click={()=> close_alert = !close_alert}
        >
            <Others render="close" />
        </button>

    </div>

  
   
</div>
</div>
{/if}