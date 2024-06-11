<script setup>

import {computed, ref} from "vue";

const date = defineModel();
const datePicker = ref(new Date());

defineProps({
  label: {
    type: String,
    default: () => '',
  },
})
function setDate($event) {
  date.value = $event.toLocaleDateString();
  datePicker.value = $event;
}
</script>

<template>
  <div class="date-picker">
    <v-text-field id="menu_activator" :label variant="outlined" :modelValue="date" />
    <v-menu activator="#menu_activator">
      <v-date-picker
          color="primary"
          :model-value="datePicker"
          @update:modelValue="setDate"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<style scoped>

</style>