<template>
  <b-form-select
    v-model="status"
    plain
    :options="statuses"
    @change="filterStatus"
  ></b-form-select>
</template>

<script lang="ts">
import Vue from 'vue';
import { Option } from '~/types/Option';
import orderStatus from '~/constants/orderStatus';

export default Vue.extend({
  name: 'FilterBar',

  data() {
    return {
      status: this.$route.query.status || null,
      statuses: [
        { value: null, text: this.$t('adminOrders.filterBar.all') },
        {
          value: orderStatus.ON_PAYMENT,
          text: this.$t('adminOrders.filterBar.on_payment'),
        },
        {
          value: orderStatus.ON_PREPARING,
          text: this.$t('adminOrders.filterBar.on_preparing'),
        },
        {
          value: orderStatus.ON_DELIVERY,
          text: this.$t('adminOrders.filterBar.on_delivery'),
        },
        {
          value: orderStatus.CANCELLED,
          text: this.$t('adminOrders.filterBar.cancelled'),
        },
      ] as Option[],
    };
  },

  methods: {
    filterStatus() {
      this.$router.push({
        query: {
          ...this.$route.query,
          status: this.status,
          page: '1',
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.form-control {
  width: unset;

  &.border-0:focus {
    box-shadow: none;
  }
}
</style>
