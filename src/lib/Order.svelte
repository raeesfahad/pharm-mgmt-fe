<script lang="ts">
  import axios from "axios";
    import Navbar from "./navbar.svelte";

  var okay: boolean = false;
  let date = new Date();

  async function formSubmit(event : any) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const { fname, phone, message, file_upload } = Object.fromEntries(formData);

  try {
    const response = await axios.post('http://localhost:8000/api/prescription/add', {
      patient_name: fname,
      patient_phone: phone,
      message,
      admin_uploaded: false,
      prescription_date: new Date().toDateString(),
      drugs: [{}],
    });

    const prescriptionId = response.data.id;

    const filedata = new FormData();
    filedata.append('file_upload',file_upload);

    await axios.post(
      `http://localhost:8000/api/prescription/prescription_file/${prescriptionId}`,
      filedata
    );

    console.log('Prescription added successfully!');
    okay = !okay; // What is this variable for?
  } catch (error) {
    console.error(error);
    alert("Upload Failed, Check Console");
  }
}
</script>

<Navbar />

{#if okay}
  <section class="text-gray-600 body-font mt-20">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1
          class="font-bold sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"
        >
          Prescription Added
        </h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
          Your Prescription Will be confirmed Shortly and you will receive you
          medicines via courier
        </p>
      </div>
      <div
        class="flex lg:w-2/3 flex flex-row justify-center w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end"
      >
        <a
          href="/#/"
          class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >Go Home</a
        >
      </div>
    </div>
  </section>
{:else}
  <div class="flex flex-row justify-center mt-10 mb-5">
    <h3 class="text-2xl font-bold text-gray-600">Request a Prescription</h3>
  </div>
  <div class="max-w-lg lg:ms-auto mx-auto text-center">
    <div class="py-16 px-7 rounded-md bg-white">
      <form on:submit|preventDefault={formSubmit}>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-6">
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Name *"
            required
            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            id="fname"
            name="phone"
            placeholder="Phone *"
            required
            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
          />

          <div class="md:col-span-2">
            <label
              for="subject"
              class="float-left block font-normal text-gray-400 text-lg"
              >Select Your Prescription Photo :</label
            >
            <input
              type="file"
              id="file"
              name="file_upload"
              required
              accept="image/*"
              placeholder="Select Your Prescription Photo"
              class="peer block w-full appearance-none border-none bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            />
          </div>
          <div class="md:col-span-2">
            <textarea
              name="message"
              rows="5"
              cols="0"
              placeholder="Message *"
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
            ></textarea>
          </div>

          <div class="md:col-span-2">
            <button
              type="submit"
              class="py-3 text-base font-medium rounded text-white bg-blue-800 w-full hover:bg-blue-700 transition duration-300"
              >Submit</button
            >
          </div>
        </div>
        <!-- Grid End -->
      </form>
    </div>
  </div>
{/if}
