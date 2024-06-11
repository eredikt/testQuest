<script setup>

defineEmits(['edit'])
defineProps({
  headers: {
    type: Array,
    default: () => ([]),
  },
  rows: {
    type: Array,
    default: () => ([]),
  },
})
</script>

<template>
  <div class="v-table">
    <table>
      <thead>
      <tr>
        <th v-for="head in headers" :key="head">{{ head.title }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" :key="row">
        <td v-for="({value}, index) in headers" :value>
          <slot :name="value" :item="row" :index="index">{{ row[value] }}</slot>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.v-table {
  overflow-x: auto;
  width: 100%;
  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      th {
        padding: 15px;
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
      }
    ;
    }

    tbody {
      tr {
        cursor: pointer;
        border-bottom: 1px dashed gray;

        &:nth-child(odd):hover {
          background: #d3d3d3;
        }

        td {
          padding: 10px;
          text-align: center;
        }
      }
    }
  }
}
</style>