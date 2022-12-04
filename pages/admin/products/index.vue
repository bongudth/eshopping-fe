<template>
  <div class="d-flex flex-column">
    <div class="text-super font-weight-bold">
      {{ $t('sidebar.product.product') }}
    </div>
    <div class="mt-2">{{ $t('adminProducts.subtitle') }}</div>
    <FilterBar class="mt-4" />
    <ProductList
      v-if="products.length"
      :products="products"
      class="mt-4"
      @deleting-product-id="getDeletingProductId"
    />
    <Pagination v-if="products.length" :meta="meta" class="mt-2" />
    <div v-else class="d-flex flex-column align-items-center mt-5">
      <NoData style="width: 400px" />
      <div class="text-super font-weight-bold mt-3">
        {{ $t('adminProducts.empty.title') }}
      </div>
      <div class="mt-2">{{ $t('adminProducts.empty.description') }}</div>
      <b-button
        variant="primary"
        class="d-flex align-items-center mt-4"
        style="min-width: fit-content"
        @click="$router.push(localePath({ name: 'admin-products-new' }))"
      >
        <IconPlus class="mr-2" />
        {{ $t('adminProducts.filterBar.addNewProduct') }}
      </b-button>
    </div>
    <ModalDelete :deleting-product="deletingProduct" @delete="deleteProduct" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import FilterBar from '~/components/admin/products/FilterBar.vue';
import ProductList from '~/components/admin/products/ProductList.vue';
import Pagination from '~/components/admin/common/Pagination.vue';
import NoData from '~/components/icons/NoData.vue';
import IconPlus from '~/components/icons/IconPlus.vue';
import { ApiRequestParams, ApiMeta } from '~/types/api';
import { Product } from '~/types/Product';
import {
  formatFilterParams,
  formatSortParams,
  separateParams,
} from '~/utils/formatParams';
import ModalDelete from '~/components/admin/products/ModalDelete.vue';

export default Vue.extend({
  name: 'AdminProducts',

  components: {
    FilterBar,
    ProductList,
    Pagination,
    NoData,
    IconPlus,
    ModalDelete,
  },

  layout: 'dashboard',

  middleware: 'auth',

  async asyncData(ctx: Context) {
    try {
      const { query } = ctx.route;
      const params: Partial<ApiRequestParams> = {
        page: query.page ? Number(query.page) : 1,
        limit: query.limit ? Number(query.limit) : 10,
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
      deletingProductId: -1,
    };
  },

  computed: {
    deletingProduct(): Product {
      return (
        this.products.find(
          (product) => product.id === this.deletingProductId
        ) || ({} as Product)
      );
    },
  },

  watchQuery: ['page', 'limit', 'search', 'status'],

  methods: {
    formatFilterParams,
    formatSortParams,
    separateParams,

    getDeletingProductId(id: number) {
      this.deletingProductId = id;
    },

    deleteProduct() {
      this.products = this.products.filter((product) => {
        return product.id !== this.deletingProductId;
      });
      if (this.products.length === 0 && this.meta.currentPage > 1) {
        this.$router.push(
          this.localePath({
            name: 'admin-products',
            query: { page: (this.meta.currentPage - 1) as unknown as string },
          })
        );
      }
    },
  },
});
</script>
