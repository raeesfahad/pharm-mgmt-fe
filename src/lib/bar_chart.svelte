<script lang="ts">
  import { onMount } from "svelte";
  import * as echarts from "echarts";

  let chartContainer: any;
  export let data: any;

  const categories = data.map((item : any) => item.name);
  const values = data.map((item : any) => item.stock);

  let option = {
    xAxis: {
      type: "category",
      data: categories,
      axisLabel: {
        rotate: 45, 
        interval: 0, 
        formatter: function (value: string) {
          return value.length > 5 ? value.slice(0, 5) + "..." : value; 
        },
      },
    },
    yAxis: {
      type: "value",
      max: Math.max(...values) + 6, 
    },
    series: [
      {
        data: values,
        type: "bar",
        itemStyle: {
          color: "gray",
        },
      },
    ],
  };

  onMount(() => {
    let chart = echarts.init(chartContainer);
    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  });
</script>

<div class="w-full h-[400px]" bind:this={chartContainer}></div>
