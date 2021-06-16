<template>
  <div other="other" class="class" v-on="whatever" v-bind="bound" id="id"></div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {},
})
</script>

<style>
  .test {
      color: red;
  }
</style>
