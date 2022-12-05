<template>
  <div class="d-flex flex-column">
    <div class="text-super font-weight-bold">
      {{ $t('sidebar.order.all') }}
    </div>
    <div class="d-flex align-items-center justify-content-between mt-1">
      <div>{{ $t('adminOrders.subtitle') }}</div>
      <FilterBar />
    </div>
    <OrderList
      v-if="orders.length"
      :orders="orders"
      class="mt-4"
      @showing-order-id="getShowingOrderId"
      @change-status="changeStatus"
    />
    <Pagination v-if="orders.length" :meta="meta" class="mt-2" />
    <div v-else class="d-flex flex-column align-items-center mt-5">
      <NoData style="width: 400px" />
      <div class="text-super font-weight-bold mt-3">
        {{ $t('adminOrders.empty.title') }}
      </div>
      <div class="mt-2">{{ $t('adminOrders.empty.description') }}</div>
    </div>
    <OrderDialog
      :order="order"
      :visible="showingOrderId ? true : false"
      @close="closeOrderDialog"
      @change-status="changeStatus"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import FilterBar from '~/components/admin/orders/FilterBar.vue';
import OrderList from '~/components/admin/orders/OrderList.vue';
import Pagination from '~/components/admin/common/Pagination.vue';
import NoData from '~/components/icons/NoData.vue';
import OrderDialog from '~/components/admin/orders/OrderDialog.vue';
import { ApiRequestParams, ApiMeta } from '~/types/api';
import { Order } from '~/types/Order';
import {
  formatFilterParams,
  formatSortParams,
  separateParams,
} from '~/utils/formatParams';

export default Vue.extend({
  name: 'AdminOrders',

  components: {
    FilterBar,
    OrderList,
    Pagination,
    NoData,
    OrderDialog,
  },

  layout: 'dashboard',

  middleware: 'auth',

  async asyncData(ctx: Context) {
    try {
      const { query } = ctx.route;
      const params: Partial<ApiRequestParams> = {
        page: query.page ? Number(query.page) : 1,
        limit: query.limit ? Number(query.limit) : 10,
      };
      const { filterParams, sortParams } = separateParams(query);
      const filter = formatFilterParams(filterParams);
      const sort = formatSortParams(sortParams);
      params.filter = filter;
      params.sort = sort;
      const {
        data: { items: orders, meta },
      } = await ctx.$services.orders.index(params);
      return { orders, meta };
    } catch (error) {
      ctx.$sentry.captureException(error);
      return { orders: [], meta: {} };
    }
  },

  data() {
    return {
      orders: [] as Order[],
      meta: {} as ApiMeta,
      showingOrderId: null as number | null,
    };
  },

  computed: {
    order(): Order {
      return (this.orders.find((order) => order.id === this.showingOrderId) ||
        {}) as Order;
    },
  },

  watchQuery: ['page', 'limit', 'status', 'updatedAt'],

  methods: {
    formatFilterParams,
    formatSortParams,
    separateParams,

    getShowingOrderId(id: number) {
      this.showingOrderId = id;
    },

    closeOrderDialog() {
      this.showingOrderId = null;
    },

    changeStatus(id: number, status: string) {
      this.$services.orders
        .update(id.toString(), { status })
        .then(() => {
          this.$bvToast.toast(this.$t('adminOrders.update.success') as string, {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          });
          this.orders = this.orders.map((order) => {
            if (order.id === id) {
              Object.assign(order, { status });
            }
            return order;
          });
        })
        .catch(() => {
          this.$bvToast.toast(this.$t('adminOrders.update.error') as string, {
            title: this.$t('toastTitle.error') as string,
            variant: 'danger',
          });
        })
        .finally(() => {
          this.closeOrderDialog();
        });
    },
  },
});
</script>
