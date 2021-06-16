<template>
  <div class="class" id="id" v-on="whatever" v-bind="bound" other="other"></div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup() {},
});
</script>

<style>
.test {
  color: red;
}
</style>
