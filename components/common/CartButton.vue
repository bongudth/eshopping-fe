<template>
  <div class="button-icon d-flex align-items-center rounded-pill p-2">
    <IconCart />
    <div class="button-icon__title ml-2">{{ $t('headerBar.cart') }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconCart from '~/components/icons/IconCart.vue';

export default Vue.extend({
  name: 'CartButton',

  components: { IconCart },
});
</script>
