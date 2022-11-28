<template>
  <div class="button-icon d-flex align-items-center rounded-pill p-2">
    <IconPackage />
    <div class="button-icon__title ml-2">{{ $t('headerBar.order') }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconPackage from '~/components/icons/IconPackage.vue';

export default Vue.extend({
  name: 'OrderButton',

  components: { IconPackage },
});
</script>
