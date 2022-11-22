<template>
  <b-button
    :disabled="disabled"
    pill
    variant="outline-primary"
    class="d-flex align-items-center"
  >
    <IconCart class="mr-2" />
    {{ $t('button.addToCart') }}
  </b-button>
</template>

<script lang="ts">
import Vue from 'vue';
import IconCart from '~/components/icons/IconCart.vue';

export default Vue.extend({
  name: 'CartAddButton',

  components: { IconCart },

  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
