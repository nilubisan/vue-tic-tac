<script setup lang="ts">
  import {reactive} from "vue";

  const state = reactive([
      [null, null, null,],
      [null, null, null,],
      [null, null, null,],
  ])
</script>

<template>
  <div class="field">
    <div v-for="row in state">
      <div class="cell" v-for="cell in row">
        {{ cell }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
