<script lang="ts">
    
    import 'boxicons'
    export let bg_class : string;
    export let icon_bg_class : string;
    export let digit : string;
    export let title : string;

</script>



<div class="w-[320px] h-[100px] rounded-lg {bg_class} flex flex-row">
    <div class="size-[60px] rounded-full {icon_bg_class}  shadow-lg mt-[20px] mx-[20px] flex flex-col items-center justify-center">
        <slot name=icon></slot>
    </div>

     <div class="mt-[20px]">
        <h1 class="text-2xl font-semibold text-white">{digit}</h1>
        <p class="text-md text-white font-light">{title}</p>

     </div>
  
</div>