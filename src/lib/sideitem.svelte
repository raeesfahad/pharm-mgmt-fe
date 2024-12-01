<script lang="ts">
  
  export let name : string;
  export let active : boolean;



</script>

<div class=" w-[250px] h-[55px] rounded-md {active ? 'bg-gray-700' : 'text-gray-700'}">

    <div class="flex flex-row gap-2 m-[15px]">
         <slot name="icon"></slot>
         <p class="text-lg font-semibold {active ? 'text-white' : 'text-gray-700'}">{name}</p>

    </div>


  </div>