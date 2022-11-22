<template>
  <b-button
    :disabled="disabled"
    pill
    variant="outline-primary"
    class="d-flex align-items-center"
  >
    <IconBuy class="mr-2" />
    {{ $t('button.buyNow') }}
  </b-button>
</template>

<script lang="ts">
import Vue from 'vue';
import IconBuy from '~/components/icons/IconBuy.vue';

export default Vue.extend({
  name: 'BuyNowButton',

  components: { IconBuy },

  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
