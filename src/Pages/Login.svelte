<script lang="ts">
  import Logo from "./../assets/pharm.png";
  import { loggedIn, LoginError } from "../store/login";

  let email: string;
  let password: string;

  function LoginUser(username: string, password: string): void {
    const loginData = {
      username,
      password,
    };

    fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(loginData).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const token = data.access_token;
        sessionStorage.setItem("token", JSON.stringify(token));
        loggedIn.set(true);
        window.location.href = "/#/dashboard";
        window.history.go(0);
      })
      .catch((error) => {
        LoginError.set(true);
        console.log(error.message);
        // Handle login failure, e.g., display error message
      });
  }
</script>

<section class="w-scree h-screen">
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <div class="flex flex-row mb-[20px] justify-center">
        <img src={Logo} alt="logo" />
      </div>
      <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div class="px-5 py-7">
          <div class="flex flex-row items-center gap-2 mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>

            <label for="" class="font-semibold text-sm text-gray-600 pb-1 block"
              >E-mail</label
            >
          </div>
          <input
            type="email"
            required
            bind:value={email}
            on:focus={() => {
              LoginError.set(false);
            }}
            name="email"
            class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full h-[50px]"
          />
          <div class="flex flex-row items-center gap-2 mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>

            <label for="" class="font-semibold text-sm text-gray-600 pb-1 block"
              >Password</label
            >
          </div>
          <input
            bind:value={password}
            required
            on:focus={() => LoginError.set(false)}
            type="password"
            name="password"
            class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full h-[50px]"
          />
          <button
            on:click={() => {
              LoginUser(email, password);
            }}
            class=" mt-[15px] transition duration-200 h-[50px] bg-gray-700 hover:bg-gray-500 focus:bg-gray-700 focus:shadow-sm focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            <span class="inline-block mr-2 text-lg">Login</span>
          </button>
        </div>
      </div>

      <div
        class="mt-[20px] flex flex-row gap-1 justify-center font-semibold text-gray-700"
      >
        {#if $LoginError}
          <box-icon type="solid" name="error-circle" color="gray" size=""
          ></box-icon>
          <span>Username or password is not correct</span>
        {/if}
      </div>
    </div>
    <div class="flex flex-row justify-center">
      <a href="/#/">Home</a>
    </div>
  </div>
</section>
