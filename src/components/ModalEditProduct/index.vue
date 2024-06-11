<script setup>
import {reactive, watch} from "vue";
import STATUS from "@/common/constant/status.js";
import DatePicker from "@/components/DatePicker.vue";

const dialog = defineModel();
const rules = [(v) => !!v || 'Поле обязательно к заполнению'];
const emits = defineEmits(['edit-row'])
const props = defineProps({
  editData: {
    type: Object,
    default: () => ({
      nameProduct: null,
      number: null,
      dateStar: null,
      status: null,
    }),
  }
});
let form = reactive({});

function onSubmit() {
  if (form.model) emits('edit-row', form)
}

watch(() => props.editData, (nv) => {
  form = nv;
})
</script>

<template>
  <v-dialog v-model="dialog" width="880">
    <v-card>
      <v-card-title>Продукт</v-card-title>
      <v-card-text>
        <v-form
            v-model="form.model"
            @submit.prevent="onSubmit"
            class="d-flex flex-wrap"
        >
          <v-text-field
              v-model="form.nameProduct"
              label="Наименование"
              variant="outlined"
              class="v-col-md-6 v-col-sm-12"
              :rules="rules"
          />
          <v-text-field
              v-model="form.number"
              label="Номер"
              variant="outlined"
              class="v-col-md-6 v-col-sm-12"
              :rules="rules"
          />
          <v-select
              v-model="form.status"
              class="v-col-md-6 v-col-sm-12"
              label="Статус"
              variant="outlined"
              :items="STATUS"
              item-value="id"
              item-title="name"
              :rules="rules"
          />
          <date-picker v-model="form.dateStar" :rules="rules" class="v-col-md-6 v-col-sm-12" label="Дата начала"/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="onSubmit" :disabled="!form.model" variant="outlined">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>