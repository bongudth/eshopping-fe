<template>
  <b-table
    hover
    borderless
    responsive
    thead-class="background-pink"
    :fields="fields"
    :items="products"
  >
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

    <template #cell(discountPrice)="data">
      <div v-for="discount in data.item.discount" :key="discount.id">
        <div>
          {{ formatPrice((data.item.price * (100 - discount.percent)) / 100) }}
        </div>
      </div>
    </template>

    <template #cell(discount)="data">
      <div
        v-for="discount in data.value"
        :key="discount.id"
        class="d-flex align-items-center"
        style="gap: 0.5rem"
      >
        <b-badge>{{ discount.percent }}%</b-badge>
        <div class="ml-2">{{ discount.name }}</div>
      </div>
    </template>

    <template #cell(action)="data">
      <IconPencil
        @click.native="
          $router.push(
            localePath({
              name: 'admin-products-slug-edit',
              params: { slug: data.item.slug },
            })
          )
        "
      />
      <IconTrash
        v-b-modal.modal-delete-product
        class="ml-3"
        @click.native="$emit('deleting-product-id', data.item.id)"
      />
    </template>
  </b-table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import IconPencil from '~/components/icons/IconPencil.vue';
import IconTrash from '~/components/icons/IconTrash.vue';
import { Product } from '~/types/Product';
import formatPrice from '~/utils/formatPrice';

export default Vue.extend({
  name: 'ProductList',

  components: {
    IconPencil,
    IconTrash,
  },

  props: {
    products: {
      type: Array as PropType<Product[]>,
      default: () => [],
    },
  },

  data() {
    return {
      fields: [
        {
          key: 'product',
          label: this.$t('adminProducts.table.product'),
        },
        {
          key: 'stock',
          label: this.$t('adminProducts.table.stock'),
          sortable: true,
        },
        {
          key: 'price',
          label: this.$t('adminProducts.table.price'),
          sortable: true,
        },
        {
          key: 'discountPrice',
          label: this.$t('adminProducts.table.discountPrice'),
          sortable: true,
        },
        {
          key: 'discount',
          label: this.$t('adminProducts.table.discount'),
        },
        {
          key: 'action',
          label: this.$t('adminProducts.table.action'),
        },
      ],
    };
  },

  methods: {
    formatPrice,
  },
});
</script>
