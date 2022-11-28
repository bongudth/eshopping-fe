<template>
  <div class="d-flex flex-column align-items-center">
    <FilterBar />
    <ProductList v-if="products.length" :products="products" />
    <Pagination v-if="products.length" :meta="meta" />
    <div v-else class="d-flex flex-column align-items-center mt-5">
      <NoData style="width: 400px" />
      <div class="text-super font-weight-bold mt-3">
        {{ $t('products.empty.title') }}
      </div>
      <div class="mt-2">{{ $t('products.empty.description') }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import FilterBar from '~/components/products/FilterBar.vue';
import ProductList from '~/components/products/ProductList.vue';
import Pagination from '~/components/products/Pagination.vue';
import NoData from '~/components/icons/NoData.vue';
import { ApiRequestParams, ApiMeta } from '~/types/api';
import { Product } from '~/types/Product';
import {
  formatFilterParams,
  formatSortParams,
  separateParams,
} from '~/utils/formatParams';

const ITEMS_PER_PAGE = 12;

export default Vue.extend({
  name: 'Products',

  components: { FilterBar, ProductList, Pagination, NoData },

  auth: 'guest',

  async asyncData(ctx: Context) {
    try {
      const { query } = ctx.route;
      const params: Partial<ApiRequestParams> = {
        page: query.page ? Number(query.page) : 1,
        limit: ITEMS_PER_PAGE,
        search: query.search || '',
      };
      const { filterParams, sortParams } = separateParams(query);
      const filter = formatFilterParams(filterParams);
      const sort = formatSortParams(sortParams);
      params.filter = filter;
      params.sort = sort;
      const {
        data: { items: products, meta },
      } = await ctx.$services.products.index(params);
      return { products, meta };
    } catch (error) {
      ctx.$sentry.captureException(error);
      return { products: [], meta: {} };
    }
  },

  data() {
    return {
      products: [] as Product[],
      meta: {} as ApiMeta,
    };
  },

  watchQuery: ['page', 'search', 'category', 'price', 'createdAt'],

  methods: {
    formatFilterParams,
    formatSortParams,
    separateParams,
  },
});
</script>
