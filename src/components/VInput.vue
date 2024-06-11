<script setup>
defineProps({
  label: {
    type: String,
    default: () => '',
  },
});
const input = defineModel();
const id = Math.floor(Math.random() * 1000)
</script>

<template>
  <div class="input-filed">
    <label :for="id">{{label}}</label>
    <input v-model="input" :id type="text" />
  </div>
</template>

<style scoped lang="scss">
.input-filed {
  position: relative;
  width: 100%;
  input {
    height: 32px;
    width: 100%;
  }
  label {
    position: absolute;
  }
}
</style>