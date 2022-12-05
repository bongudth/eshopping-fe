<template>
  <div class="d-flex flex-column">
    <div class="text-super font-weight-bold">
      {{ $t('sidebar.product.discount') }}
    </div>
    <div class="mt-2">{{ $t('adminDiscounts.subtitle') }}</div>
    <FilterBar class="mt-4" />
    <DiscountList
      v-if="discounts.length"
      :discounts="discounts"
      class="mt-4"
      @deleting-discount-id="getDeletingDiscountId"
    />
    <Pagination v-if="discounts.length" :meta="meta" class="mt-2" />
    <div v-else class="d-flex flex-column align-items-center mt-5">
      <NoData style="width: 400px" />
      <div class="text-super font-weight-bold mt-3">
        {{ $t('adminDiscounts.empty.title') }}
      </div>
      <div class="mt-2">{{ $t('adminDiscounts.empty.description') }}</div>
      <b-button
        variant="primary"
        class="d-flex align-items-center mt-4"
        style="min-width: fit-content"
        @click="$router.push(localePath({ name: 'admin-discounts-new' }))"
      >
        <IconPlus class="mr-2" />
        {{ $t('adminDiscounts.filterBar.addNewDiscount') }}
      </b-button>
    </div>
    <ModalDelete
      :deleting-discount="deletingDiscount"
      @delete="deleteDiscount"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import FilterBar from '~/components/admin/discounts/FilterBar.vue';
import DiscountList from '~/components/admin/discounts/DiscountList.vue';
import Pagination from '~/components/admin/common/Pagination.vue';
import NoData from '~/components/icons/NoData.vue';
import IconPlus from '~/components/icons/IconPlus.vue';
import { ApiRequestParams, ApiMeta } from '~/types/api';
import { Discount } from '~/types/Discount';
import {
  formatFilterParams,
  formatSortParams,
  separateParams,
} from '~/utils/formatParams';
import ModalDelete from '~/components/admin/discounts/ModalDelete.vue';

export default Vue.extend({
  name: 'AdminDiscounts',

  components: {
    FilterBar,
    DiscountList,
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
        data: { items: discounts, meta },
      } = await ctx.$services.discounts.index(params);
      return { discounts, meta };
    } catch (error) {
      ctx.$sentry.captureException(error);
      return { discounts: [], meta: {} };
    }
  },

  data() {
    return {
      discounts: [] as Discount[],
      meta: {} as ApiMeta,
      deletingDiscountId: -1,
    };
  },

  computed: {
    deletingDiscount(): Discount {
      return (
        this.discounts.find(
          (discount) => discount.id === this.deletingDiscountId
        ) || ({} as Discount)
      );
    },
  },

  watchQuery: ['page', 'limit', 'search'],

  methods: {
    formatFilterParams,
    formatSortParams,
    separateParams,

    getDeletingDiscountId(id: number) {
      this.deletingDiscountId = id;
    },

    deleteDiscount() {
      this.discounts = this.discounts.filter((discount) => {
        return discount.id !== this.deletingDiscountId;
      });
      if (this.discounts.length === 0 && this.meta.currentPage > 1) {
        this.$router.push(
          this.localePath({
            name: 'admin-discounts',
            query: { page: (this.meta.currentPage - 1) as unknown as string },
          })
        );
      }
    },
  },
});
</script>
