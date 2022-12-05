<template>
  <b-table
    hover
    sticky-header="500px"
    borderless
    responsive
    thead-class="background-pink"
    :fields="fields"
    :items="products"
  >
    <template #cell(index)="data">
      {{ data.index + 1 }}
    </template>

    <template #cell(product)="data">
      <div class="d-flex align-items-center">
        <img
          :src="data.item.image"
          alt="eShopping image"
          width="42"
          height="42"
          class="rounded object-fit-cover"
        />
        <div class="d-flex flex-column align-items-start ml-3">
          <div class="font-weight-bold">
            {{ data.item.name }}
          </div>
          <div class="text-small">{{ data.item.category }}</div>
        </div>
      </div>
    </template>

    <template #cell(size)="data">
      <div>Size {{ data.value }}</div>
    </template>

    <template #cell(quantity)="data">
      <div>{{ data.value }}</div>
    </template>

    <template #cell(price)="data">
      <div>{{ formatPrice(data.value) }}</div>
    </template>

    <template #cell(total)="data">
      <div>{{ formatPrice(data.item.quantity * data.item.price) }}</div>
    </template>

    <template #cell(delete)="data">
      <IconTrash class="ml-3" @click.native="$emit('remove', data.item.id)" />
    </template>
  </b-table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import IconTrash from '~/components/icons/IconTrash.vue';
import { Product } from '~/types/Product';
import formatPrice from '~/utils/formatPrice';

export default Vue.extend({
  name: 'ProductList',

  components: {
    IconTrash,
  },

  props: {
    products: {
      type: Array as PropType<Product[]>,
      default: () => [],
    },

    quantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      fields: [
        {
          key: 'index',
          label: '#',
        },
        {
          key: 'product',
          label: this.$t('adminReceipts.new.product.table.product'),
        },
        {
          key: 'size',
          label: this.$t('adminReceipts.new.product.table.size'),
        },
        {
          key: 'quantity',
          label: this.$t('adminReceipts.new.product.table.quantity'),
        },
        {
          key: 'price',
          label: this.$t('adminReceipts.new.product.table.price'),
        },
        {
          key: 'total',
          label: this.$t('adminReceipts.new.product.table.total'),
        },
        {
          key: 'delete',
          label: this.$t('adminReceipts.new.product.table.delete'),
          class: 'text-right',
        },
      ],
    };
  },

  methods: {
    formatPrice,
  },
});
</script>
