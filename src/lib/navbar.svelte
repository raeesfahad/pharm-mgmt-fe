<script>
import logo from "../assets/pharm.png";
import { location } from "svelte-spa-router";
</script>


<div class="flex flex-row justify-between p-4 w-screen">
    <div>
      <a
        href="/#/"
        class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
      >
        <img class="w-[140px] h-[35px]" alt="logo" src={logo} />
      </a>
    </div>
    <div class="flex items-center justify-center gap-2">
      <nav
        class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-end"
      >
        <a href="/#/" class="mr-5 font-semibold {$location === "/" ? "text-blue-500 text-lg" : "text-gray-600"} font-semibold hover:{$location === "/" ? "text-blue-500" : "text-gray-600"} hover:font-bold">Home</a>
        <a href="/#/order" class="mr-5 {$location === "/order" ? "text-blue-500 text-lg" : "text-gray-600"} font-semibold hover:{$location === "/order" ? "text-blue-500" : "text-gray-600"} hover:font-bold">Request Prescription</a>
      </nav>
    </div>
  </div>