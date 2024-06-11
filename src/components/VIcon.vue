<script setup>
  import SvgIcon from '@jamescoyle/vue-icon';
  defineProps({
    icon: '',
  })

</script>

<template>
  <svg-icon type="mdi" :path="icon"></svg-icon>
</template>

<style scoped>

</style>