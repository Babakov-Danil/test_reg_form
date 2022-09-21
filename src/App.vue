<script setup>
import { onMounted, ref } from "vue";
import RegisterForm from "./components/registerForm.vue";
let width = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

const updateWidth = () => {
  width.value = window.innerWidth;
};
</script>

<template>
  <div
    :style="{
      alignItems: width < 575 ? 'center' : '',
      width: width < 575 ? '80%' : '100%',
    }"
    class="wrapper"
  >
    <RegisterForm />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100%;
}
</style>
