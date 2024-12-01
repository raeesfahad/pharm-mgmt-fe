<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';


  let chart: any;
  let chartDom: HTMLDivElement;
  export let data;

  onMount(() => {
    chartDom = document.getElementById('chart') as HTMLDivElement;
    chart = echarts.init(chartDom);
    chart.setOption(option);
  });

  let option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Most Sold',
      type: 'pie',
      radius: ['40%', '70%'],
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1
      },
      avoidLabelOverlap: true,
      label: {
        show: false,
        position: 'center',
        fontWeight : 'bold',
        fontSize : 20
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: true
      },
      data: data
    }
  ]
};
</script>

<div id="chart" class="w-[500px] h-[380px]"></div>