<script setup>
import VTable from "@/components/VTable.vue";
import {ref} from "vue";
const headers = [
  {
    label: 'наименование',
    key: 'name'
  },
  {
    label: 'Статус',
    key: 'status'
  },
]


const rows = ref([
  {
    name: 'name test',
    status: 'pending'
  },
  {
    name: 'name test2',
    status: 'pending'
  },
  {
    name: 'name test3',
    status: 'pending'
  },
  {
    name: 'name test4',
    status: 'pending'
  },
]);
function setEdit(row) {
  console.log(row);
}
</script>

<template>
  <main>
    <v-table :headers :rows :editable-rows="true" @edit="setEdit"/>
  </main>
</template>

<style scoped>
main {
  width: 100%
}
</style>