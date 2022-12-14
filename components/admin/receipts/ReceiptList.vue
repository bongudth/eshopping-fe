<template>
  <b-table
    hover
    borderless
    responsive
    thead-class="background-pink"
    :fields="fields"
    :items="receipts"
  >
    <template #cell(createdAt)="data">
      {{ formatDateTime(data.value) }}
    </template>

    <template #cell(total)="data">
      <div>{{ formatPrice(data.value) }}</div>
    </template>

    <template #cell(receiptProducts)="data">
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

    <template #cell(price)="data">
      <div class="d-flex flex-column">
        <div
          v-for="item in data.item.receiptProducts"
          :key="item.id"
          class="d-flex align-items-center"
        >
          <div>
            {{ formatPrice(item.price) }} / {{ item.productSize.product.unit }}
          </div>
        </div>
      </div>
    </template>

    <template #cell(totalPrice)="data">
      <div class="d-flex flex-column">
        <div
          v-for="item in data.item.receiptProducts"
          :key="item.id"
          class="d-flex align-items-center"
        >
          <div>
            {{ formatPrice(item.price * item.quantity) }}
          </div>
        </div>
      </div>
    </template>
  </b-table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Receipt } from '~/types/Receipt';
import formatDateTime from '~/utils/formatDateTime';
import formatPrice from '~/utils/formatPrice';

export default Vue.extend({
  name: 'ReceiptList',

  props: {
    receipts: {
      type: Array as PropType<Receipt[]>,
      default: () => [],
    },
  },

  data() {
    return {
      fields: [
        {
          key: 'createdAt',
          label: this.$t('adminReceipts.table.date'),
          sortable: true,
        },
        {
          key: 'total',
          label: this.$t('adminReceipts.table.total'),
        },
        {
          key: 'receiptProducts',
          label: this.$t('adminReceipts.table.products'),
        },
        {
          key: 'price',
          label: this.$t('adminReceipts.table.price'),
        },
        {
          key: 'totalPrice',
          label: this.$t('adminReceipts.table.totalPrice'),
        },
      ],
    };
  },

  methods: {
    formatDateTime,
    formatPrice,
  },
});
</script>
