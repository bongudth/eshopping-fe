<template>
  <b-button
    pill
    variant="outline-secondary"
    :class="[
      'text-lowercase px-2 py-1 ml-2',
      {
        'size--active background-pink text-primary border-primary':
          selectedProductSizeId === productSize.id,
      },
    ]"
    :disabled="productSize.quantity === 0"
    @click="$emit('change', productSize.id)"
  >
    {{ productSize.size.name }}
  </b-button>
</template>

<script lang="ts">
import Vue from 'vue';
import { ProductSize } from '~/types/Size';

export default Vue.extend({
  name: 'TierModel',

  props: {
    productSize: {
      type: Object as () => ProductSize,
      default: {} as ProductSize,
    },

    selectedProductSizeId: {
      type: Number,
      default: -1,
    },
  },
});
</script>

<style lang="scss" scoped>
.size--active {
  &:hover {
    background-color: $pink-bg;
    color: $primary;
  }
}
</style>
