<script lang="ts">
  import { modalopen } from "../store/modal";


 function toggleModal():void{
    
    modalopen.set(!$modalopen)

 }

  export let name : string ;
  export let pharma : string;

</script>

<div class="w-[480px] h-[80px] rounded-lg border">

    <div class="flex flex-row justify-between">

        <div class="mt-25px">
            <div class="m-[15px] flex flex-row gap-3">
           <box-icon type='solid' size="lg" name='plus-square' color="gray"></box-icon>
                <div class="text-gray-600">
                    <p class="text-lg font-extrabold">{name}</p>
                     <p>{pharma}</p>
    
                </div>
            </div>
           
           

        </div>

        <div class=" mt-[25px] mx-[15px] flex flex-col items-center justify-center">
            <button on:click={toggleModal} class="bg-teal-200 text-gray-700 p-0.5 w-[80px] rounded-md text-sm">Details</button>
        </div>


    </div>

</div>