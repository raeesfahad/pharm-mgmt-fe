<script lang="ts">

  export let title : string;
  export let sub_heading : string;
 ; 

</script>
<div class="flex flex-row items-center justify-between h-[100px] mx-[15px]">
      <div class="">
        <h3 class="font-bold text-gray-700 text-2xl">{title}</h3>
        <span class=" text-gray-700">{sub_heading}</span>
      </div>
      <div>
        <slot name="buttons-ct"></slot>
      </div>
  </div>