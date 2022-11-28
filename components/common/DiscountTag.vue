<template>
  <div
    class="
      background-pink-dark
      d-flex
      align-items-center
      rounded-pill
      py-1
      px-2
    "
  >
    <IconDiscount class="mr-2" />
    <div>{{ discountText }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconDiscount from '~/components/icons/IconDiscount.vue';

export default Vue.extend({
  name: 'DiscountTag',

  components: { IconDiscount },

  props: {
    percent: {
      type: Number,
      required: true,
    },
  },

  computed: {
    discountText(): string {
      return `${this.$t('tag.sale')} ${this.percent}%`;
    },
  },
});
</script>
