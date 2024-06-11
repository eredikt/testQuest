<script setup>
  import {ref} from "vue";
  import STATUS from "@/common/constant/status.js";

  const form = defineModel({
    model: false,
    name:'',
    number: '',
    status: -1,
    dateStart: new Date().toLocaleDateString(),
  });

</script>

<template>
  <div class="d-flex">
    <v-text-field v-model="form.name" label="Наименование" variant="outlined" class="v-col-6"></v-text-field>
    <v-text-field v-model="form.number" label="Номер" variant="outlined" class="v-col-6"></v-text-field>
    <v-select
        v-model="form.number"
        class="v-col-md-3 px-0 v-col-sm-12"
        label="Статус"
        variant="outlined"
        :items="STATUS"
        item-value="id"
        item-title="name"
    />
  </div>
</template>

<style scoped>

</style>