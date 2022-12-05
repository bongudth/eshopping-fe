<template>
  <b-table
    hover
    borderless
    responsive
    thead-class="background-pink"
    :fields="fields"
    :items="orders"
    :sort-by.sync="sortByUpdatedAt"
    :sort-desc.sync="sortDescUpdatedAt"
    @row-clicked="$emit('showing-order-id', $event.id)"
  >
    <template #cell(date)="data">
      {{ formatDateTime(data.item.updatedAt) }}
    </template>

    <template #cell(status)="data">
      <StatusTag :status="data.value" />
    </template>

    <template #cell(orderItems)="data">
      <div class="d-flex flex-column">
        <div
          v-for="item in data.value"
          :key="item.id"
          class="d-flex align-items-center"
        >
          <b-badge>{{ item.quantity }}</b-badge>
          <div class="ml-2">{{ item.productSize.product.name }}</div>
          <div class="ml-1">(Size {{ item.productSize.size.name }})</div>
        </div>
      </div>
    </template>

    <template #cell(total)="data">
      <div>{{ formatPrice(data.value) }}</div>
    </template>

    <template #cell(actions)="data">
      <div
        v-if="getOrderAction(data.item.status)[0].text !== ''"
        class="d-flex"
        style="gap: 1rem"
      >
        <b-button
          v-for="action in getOrderAction(data.item.status)"
          :key="action.text"
          :variant="action.variant"
          class="d-flex align-items-center justify-content-center"
          style="min-width: fit-content"
          @click="$emit('change-status', data.item.id, action.status)"
        >
          {{ $t(`adminOrders.table.mark.${action.text}`) }}
        </b-button>
      </div>
    </template>
  </b-table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Order } from '~/types/Order';
import StatusTag from '~/components/common/StatusTag.vue';
import formatDateTime from '~/utils/formatDateTime';
import formatPrice from '~/utils/formatPrice';
import orderStatus from '~/constants/orderStatus';
import getOrderAction from '~/utils/getOrderAction';

export default Vue.extend({
  name: 'OrderList',

  components: {
    StatusTag,
  },

  props: {
    orders: {
      type: Array as PropType<Order[]>,
      default: () => [],
    },
  },

  data() {
    return {
      orderStatus,
      sortByUpdatedAt: this.$route.query.updatedAt ? 'updatedAt' : '',
      sortDescUpdatedAt: this.$route.query.updatedAt !== 'desc',
      fields: [
        {
          key: 'date',
          label: this.$t('adminOrders.table.date'),
          sortable: true,
        },
        {
          key: 'status',
          label: this.$t('adminOrders.table.status'),
        },
        {
          key: 'orderItems',
          label: this.$t('adminOrders.table.orderItems'),
        },
        {
          key: 'total',
          label: this.$t('adminOrders.table.total'),
        },
        {
          key: 'name',
          label: this.$t('adminOrders.table.customer'),
        },
        {
          key: 'actions',
          label: this.$t('adminOrders.table.actions'),
        },
      ],
    };
  },

  watch: {
    sortDescUpdatedAt() {
      this.$router.push({
        query: {
          ...this.$route.query,
          updatedAt: this.sortDescUpdatedAt ? 'desc' : 'asc',
        },
      });
    },
  },

  methods: {
    formatDateTime,
    formatPrice,
    getOrderAction,
  },
});
</script>
