<script lang="ts">

    export let is_admin :boolean;


</script>


{#if is_admin}
<span class="bg-blue-500 text-white text-sm text-center font-medium me-2 px-[10px] rounded-full">Admin</span>
{:else}
<span class="bg-green-500 text-white text-sm text-center font-medium me-2 px-[15px] rounded-full">User</span>

{/if}