<script setup>
import VTable from "@/components/VTable.vue";
import ModalEditProduct from "@/components/ModalEditProduct/index.vue";
import {ref, onMounted, computed, toRefs} from "vue";
import axios from "axios";
import STATUS from "@/common/constant/status.js";
import iconNames from "@/common/constant/iconNames.js";
import VIcon from "@/components/VIcon.vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();


const {name, number, status, itemsStatus} = filter();
const {openEditModal,setData,showChart, computedRows, headers, getStatus, editData, dialog} = table(toRefs({name, number, status}));



function table({name, number, status}) {
  const headers = [
    {
      title: 'Наименование',
      value: 'nameProduct'
    },
    {
      title: 'Номер',
      value: 'number'
    },
    {
      title: 'Дата создания',
      value: 'dateStar'
    },
    {
      title: 'Статус',
      value: 'status'
    },
    {
      title: ' ',
      value: 'action'
    },

  ];
  const rows = ref([]);
  const editData = ref({});
  const dialog = ref(false);

  const computedRows = computed(() => {
    return rows.value.filter(item =>
        item.nameProduct.toLowerCase().indexOf(name.value) !== -1 &&
        String(item.number).toLocaleLowerCase().indexOf(number.value) !== -1
        && (status.value === -1 || item.status === status.value)
    )
  })
  async function getData() {
    try {
      const {data} = await axios.get('../../data.json');
      if (data.status) {
        rows.value = data.data;
      }
    } catch (e) {
      console.log('Ошибка в странице продуктов запрос на выборку в таблицу', e);
    }
  }
  function getStatus({status}) {
    return STATUS.find(st => st.id === status).name
  }

  function showChart(row) {
    if (!row.id) return;
    router.push('/chart');
    store.commit('product/setProduct', row.id)
    store.commit('product/setInfoProduct', row)
  }

  function openEditModal(row) {
    dialog.value = !dialog.value;
    editData.value = {...row};
  }
  async function setData(data) {
    try {
      if (!dialog.value) return;
      dialog.value = !dialog.value;
      const responce = await axios.post('../../data.json', data);
      if (responce.status) {
        const index = rows.value.findIndex(item => item.id === data.id);
        rows.value[index] = data;
        console.log('Данные записаны');
      }
    } catch (e) {
      console.log('Ошибка при записи данных', e);
    }
  }
  onMounted(() => {
    getData()
  });

  return {
    editData,
    headers,
    computedRows,
    openEditModal,
    getStatus,
    setData,
    dialog,
    showChart
  }
}

function filter () {
  const name = ref('');
  const number = ref('');
  const status = ref(-1);
  const itemsStatus = ref([{
    id: -1,
    name: 'Все',
  },...STATUS])
  return {
    name, number, status, itemsStatus
  }
}
</script>

<template>
  <main>
    <div class="filter v-col-12">
      <v-card>
        <template #title>
          <span class="font-weight-black">Поиск данных</span>
        </template>
        <v-card-text class="d-flex flex-wrap justify-lg-center">
          <v-text-field v-model="name" class="v-col-md-3 px-0 v-col-sm-12" label="Наименование" variant="outlined" rounded="0"/>
          <v-text-field v-model="number" class="v-col-md-3 px-0 v-col-sm-12 mx-md-3 mx-sm-0" label="Номер заказа" variant="outlined" rounded="0"/>
          <v-select
              v-model="status"
              class="v-col-md-3 px-0 v-col-sm-12"
              label="Статус"
              variant="outlined"
              :items="itemsStatus"
              item-value="id"
              item-title="name"
          />
        </v-card-text>
      </v-card>
    </div>
    <div class="v-col-12">
      <v-card>
        <template #title>
          <span class="font-weight-black">Таблица продуктов в системе</span>
        </template>
        <v-card-text>
          <v-table :headers :rows="computedRows">
            <template #status="{item}">
              {{ getStatus(item) }}
            </template>
            <template #action="{item}">
              <v-icon :icon="iconNames.EDIT" @click="openEditModal(item)"></v-icon>
              <v-icon :icon="iconNames.EYE" @click="showChart(item)"></v-icon>
            </template>
          </v-table>
        </v-card-text>
      </v-card>
    </div>
    <modal-edit-product v-model="dialog" :edit-data="editData" @edit-row="setData"/>
  </main>
</template>

<style scoped>

</style>