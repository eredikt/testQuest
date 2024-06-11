<script setup>
import {useStore} from "vuex";
import {computed, onMounted, reactive, ref, toRef} from "vue";
import VIcon from "@/components/VIcon.vue";
import Chart from "@/components/Chart.vue";

import {useRouter} from "vue-router";
import axios from "axios";
import iconNames from "@/common/constant/iconNames.js";

const router = useRouter();
const store = useStore();


const loader = ref(false);
const datasets = ref([]);
const idProduct = computed(() => store.state.product.idProduct);
const infoProduct = computed(() => store.state.product.infoProduct);

async function getChart() {
  try {
    const {data} = await axios.get('../../chart.json');
    if (!data.status && !data.data?.length) return;
    datasets.value = data.data.find(item => +item.id === +idProduct.value).datasets;
    loader.value = true;
  } catch (e) {
    console.log('Ошибка при загрузке данных графика', e);
    loader.value = false;
  }
}

onMounted(() => {
  getChart();
})
</script>

<template>
  <v-btn variant="text" @click="router.push('/')">
    <v-icon :icon="iconNames.ARROW_LEFT"></v-icon>
  </v-btn>
  <div class="d-flex pr-3">
    <div v-if="loader" class="chart v-col-md-9 v-col-sm-12">
      <chart :datasets="datasets"/>
    </div>
    <v-card class="v-col-md-3 v-col-sm-12">
      <v-card-title>Информация о продукте</v-card-title>
      <v-card-text>
        <div class="py-3 border-b">
          <span class="text-subtitle-1">Наименование: </span>
          <span>{{ infoProduct.nameProduct }}</span>
        </div>
        <div class="py-3 border-b">
          <span class="text-subtitle-1">Номер: </span>
          <span>{{ infoProduct.number }}</span>
        </div>
        <div class="py-3 border-b">
          <span class="text-subtitle-1">Дата создания: </span>
          <span>{{ infoProduct.dateStar }}</span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.chart {
  width: 100%;
  height: 300px;

  canvas {
    margin: auto;
    width: 50% !important;
    height: 300px !important;
  }

  @media (max-width: 800px) {
    canvas {
      margin: 15px 0;
      width: 100% !important;
      height: 50%;
    }
  }
}
</style>