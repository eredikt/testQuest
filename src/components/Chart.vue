<script setup>
import {Line} from 'vue-chartjs'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import {reactive, watch} from "vue";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const props = defineProps({
  datasets: {
    type: Array,
    default: () => ([])
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
const chartData = reactive({
  labels: ['Январь', 'Февраль', 'Март'],
  datasets: props.datasets
});

</script>

<template>
  <Line
      :options="chartOptions"
      :data="chartData"
  />
</template>

<style scoped>

</style>