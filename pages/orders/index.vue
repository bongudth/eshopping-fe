<template>
  <div class="d-flex flex-column align-items-center">
    <div class="title mb-5">
      {{ $t('orders.order') }}
    </div>
    <b-table
      v-if="orders.length"
      hover
      borderless
      responsive
      thead-class="background-pink"
      :fields="fields"
      :items="orders"
      @row-clicked="
        $router.push(
          localePath({ name: 'orders-id', params: { id: $event.id } })
        )
      "
    >
      <template #cell(orderItems)="data">
        {{ getProducts(data.item.id) }}
      </template>
      <template #cell(total)="data">
        {{ formatPrice(data.value) }}
      </template>
      <template #cell(status)="data">
        {{ getStatus(data.value) }}
      </template>
      <template #cell(createdAt)="data">
        {{ formatDate(data.value) }}
      </template>
    </b-table>
    <b-pagination-nav
      v-if="orders.length && meta.totalPages > 1"
      v-model="meta.currentPage"
      pills
      :link-gen="linkGen"
      :number-of-pages="meta.totalPages"
      use-router
      limit="3"
      class="mt-5"
    ></b-pagination-nav>
    <div
      v-if="!orders.length"
      class="d-flex flex-column align-items-center mt-5"
    >
      <NoData style="width: 400px" />
      <div class="text-super font-weight-bold mt-3">
        {{ $t('orders.empty.title') }}
      </div>
      <div class="mt-2">{{ $t('orders.empty.description') }}</div>
      <b-button
        variant="primary"
        class="mt-4"
        style="min-width: fit-content"
        @click="$router.push(localePath({ name: 'products' }))"
      >
        {{ $t('orders.empty.goToShop') }}
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import { Order, OrderItem } from '~/types/Order';
import { ApiMeta } from '~/types/api';
import formatPrice from '~/utils/formatPrice';
import NoData from '~/components/icons/NoData.vue';

export default Vue.extend({
  name: 'Orders',

  components: {
    NoData,
  },

  middleware: 'auth',

  async asyncData(ctx: Context) {
    try {
      const {
        data: { items: orders, meta },
      } = await ctx.$axios.$get('/orders/mine', {
        params: {
          page: ctx.route.query.page || 1,
        },
      });
      return { orders, meta };
    } catch (error) {
      ctx.$sentry.captureException(error);
      return { orders: [], meta: {} };
    }
  },

  data() {
    return {
      orders: [] as Order[],
      fields: [
        {
          key: 'id',
          label: '#',
        },
        {
          key: 'orderItems',
          label: this.$t('orders.table.product'),
        },
        {
          key: 'total',
          label: this.$t('orders.table.total'),
          sortable: true,
        },
        {
          key: 'status',
          label: this.$t('orders.table.status'),
          sortable: true,
        },
        {
          key: 'createdAt',
          label: this.$t('orders.table.createdAt'),
          sortable: true,
        },
      ],
      meta: {} as ApiMeta,
    };
  },

  watchQuery: ['page'],

  methods: {
    formatPrice,

    getProducts(orderId: number) {
      const products = this.orders
        .find((order) => order.id === orderId)
        ?.orderItems.map((item: OrderItem) => item.productSize.product.name);
      return products?.join(', ');
    },

    getStatus(status: string) {
      return this.$t(`orders.status.${status}`);
    },

    formatDate(date: string) {
      return new Date(date).toLocaleDateString();
    },

    linkGen(page = 1) {
      return {
        query: {
          ...this.$route.query,
          page: String(page),
        },
      };
    },
  },
});
</script>
