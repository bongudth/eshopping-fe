<template>
  <div class="default-layout background-pink">
    <Header />
    <div class="container px-3 py-5">
      <Nuxt />
    </div>
    <footer class="text-center">
      <span>© {{ new Date().getFullYear() }}</span>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '~/components/partials/user/TheHeader.vue';

export default Vue.extend({
  name: 'DefaultLayout',

  components: { Header },
});
</script>

<style lang="scss" scoped>
.default-layout {
  min-height: calc(100vh - #{$header-height});
}

.container {
  min-height: calc(100vh - #{$header-height} - #{$footer-height});
  margin-top: $header-height;
}
</style>
