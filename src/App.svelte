<script lang="ts">
  import Layout from "./lib/layout.svelte";
  import ScreenError from "./lib/screen-error.svelte";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import { onMount } from "svelte";
  import { piechart_data } from "./store/piechart";
  import Alert from "./lib/alert.svelte";
  import { writable, type Writable } from "svelte/store";
  let userAgent = navigator.userAgent;
  let isMobileOrTablet =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );

  let queryClient = new QueryClient();
  let network_ok: Writable<boolean> = writable(true);

  onMount(() => {
    const url = "http://localhost:8000/api/dashboard";
    const token = sessionStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          network_ok.set(false);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const db_data = await response.json();
        piechart_data.set(db_data.chart_data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 30000);
    
    return () => clearInterval(intervalId);
  });
</script>

<QueryClientProvider client={queryClient}>
  {#if isMobileOrTablet}
    <ScreenError />
  {:else if $network_ok}
    <Layout />
  {:else}
    <h1>No Network</h1>
  {/if}
</QueryClientProvider>
