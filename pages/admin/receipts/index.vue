<template>
  <div class="d-flex flex-column">
    <div class="text-super font-weight-bold">
      {{ $t('sidebar.product.receipt') }}
    </div>
    <div class="d-flex align-items-center justify-content-between mt-1">
      <div>{{ $t('adminReceipts.subtitle') }}</div>
      <FilterBar />
    </div>
    <ReceiptList v-if="receipts.length" :receipts="receipts" class="mt-4" />
    <Pagination v-if="receipts.length" :meta="meta" class="mt-2" />
    <div v-else class="d-flex flex-column align-items-center mt-5">
      <NoData style="width: 400px" />
      <div class="text-super font-weight-bold mt-3">
        {{ $t('adminReceipts.empty.title') }}
      </div>
      <div class="mt-2">{{ $t('adminReceipts.empty.description') }}</div>
      <b-button
        variant="primary"
        class="d-flex align-items-center mt-4"
        style="min-width: fit-content"
        @click="$router.push(localePath({ name: 'admin-receipts-new' }))"
      >
        <IconPlus class="mr-2" />
        {{ $t('adminReceipts.filterBar.importProduct') }}
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import FilterBar from '~/components/admin/receipts/FilterBar.vue';
import ReceiptList from '~/components/admin/receipts/ReceiptList.vue';
import Pagination from '~/components/admin/common/Pagination.vue';
import NoData from '~/components/icons/NoData.vue';
import IconPlus from '~/components/icons/IconPlus.vue';
import { ApiRequestParams, ApiMeta } from '~/types/api';
import { Receipt } from '~/types/Receipt';
import {
  formatFilterParams,
  formatSortParams,
  separateParams,
} from '~/utils/formatParams';

export default Vue.extend({
  name: 'AdminReceipts',

  components: {
    FilterBar,
    ReceiptList,
    Pagination,
    NoData,
    IconPlus,
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
        data: { items: receipts, meta },
      } = await ctx.$services.receipts.index(params);
      return { receipts, meta };
    } catch (error) {
      ctx.$sentry.captureException(error);
      return { receipts: [], meta: {} };
    }
  },

  data() {
    return {
      receipts: [] as Receipt[],
      meta: {} as ApiMeta,
    };
  },

  watchQuery: ['page', 'limit'],

  methods: {
    formatFilterParams,
    formatSortParams,
    separateParams,
  },
});
</script>
