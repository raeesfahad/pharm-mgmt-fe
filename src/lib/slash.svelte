<script>
  import Navbar from "./navbar.svelte";
</script>

<Navbar />

<section class="text-gray-600 body-font">
  <div
    class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"
  >
    <div
      class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
    >
      <h1
        class="title-font font-semibold sm:text-4xl text-3xl mb-4 font-medium text-gray-900"
      >
        Your pharmacy without moving
        <br class="hidden lg:inline-block" /> from home
      </h1>
      <p class="mb-8 leading-relaxed">
        Get quality medicines delivered right to your door. Order online, save
        time, and enjoy discreet shipping. Fast, secure, and convenient - your
        health, now just a click away.
      </p>
      <div class="flex mt-[90px] justify-center">
        <a
          href="/#/order"
          class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >Upload Your Prescription</a
        >
      </div>
    </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img
        class="object-cover object-center rounded w-[600px] h-[400px]"
        alt="hero"
        src="https://images.unsplash.com/photo-1523243319451-54b60322f948?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D"
      />
    </div>
  </div>
</section>

<section></section>
