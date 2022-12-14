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
          :src="
            data.item.images.length
              ? data.item.images[0].url
              : 'https://www.democraciacristajovem.org.br/wp-content/themes/dc_jovem2022/assets/images/default.jpg'
          "
          alt="eShopping image"
          width="42"
          height="42"
          class="rounded object-fit-cover"
        />
        <div class="d-flex flex-column align-items-start ml-3">
          <div class="font-weight-bold">
            {{ data.item.name }}
          </div>
          <div class="text-small">{{ data.item.category.name }}</div>
        </div>
      </div>
    </template>

    <template #cell(stock)="data">
      <div>{{ data.value }}</div>
    </template>

    <template #cell(price)="data">
      <div>{{ formatPrice(data.value) }}</div>
    </template>

    <template #cell(discount)="data">
      <div>{{ formatPrice(data.item.price * (1 - percent / 100)) }}</div>
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

    percent: {
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
          label: this.$t('adminDiscounts.new.product.table.product'),
        },
        {
          key: 'stock',
          label: this.$t('adminDiscounts.new.product.table.stock'),
        },
        {
          key: 'price',
          label: this.$t('adminDiscounts.new.product.table.price'),
        },
        {
          key: 'discount',
          label: this.$t('adminDiscounts.new.product.table.discountPrice'),
        },
        {
          key: 'delete',
          label: this.$t('adminDiscounts.new.product.table.delete'),
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
