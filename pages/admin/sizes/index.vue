<template>
  <div class="d-flex flex-column">
    <div class="text-super font-weight-bold">
      {{ $t('sidebar.product.size') }}
    </div>
    <div class="mt-2">{{ $t('adminSizes.subtitle') }}</div>
    <FilterBar class="mt-4" />
    <SizeList
      v-if="sizes.length"
      :sizes="sizes"
      class="mt-4"
      @deleting-size-id="getDeletingSizeId"
    />
    <Pagination v-if="sizes.length" :meta="meta" class="mt-2" />
    <div v-else class="d-flex flex-column align-items-center mt-5">
      <NoData style="width: 400px" />
      <div class="text-super font-weight-bold mt-3">
        {{ $t('adminSizes.empty.title') }}
      </div>
      <div class="mt-2">{{ $t('adminSizes.empty.description') }}</div>
      <b-button
        variant="primary"
        class="d-flex align-items-center mt-4"
        style="min-width: fit-content"
        @click="$router.push(localePath({ name: 'admin-sizes-new' }))"
      >
        <IconPlus class="mr-2" />
        {{ $t('adminSizes.filterBar.addNewSize') }}
      </b-button>
    </div>
    <ModalDelete :deleting-size="deletingSize" @delete="deleteSize" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import FilterBar from '~/components/admin/sizes/FilterBar.vue';
import SizeList from '~/components/admin/sizes/SizeList.vue';
import Pagination from '~/components/admin/common/Pagination.vue';
import NoData from '~/components/icons/NoData.vue';
import IconPlus from '~/components/icons/IconPlus.vue';
import { ApiRequestParams, ApiMeta } from '~/types/api';
import { Size } from '~/types/Size';
import {
  formatFilterParams,
  formatSortParams,
  separateParams,
} from '~/utils/formatParams';
import ModalDelete from '~/components/admin/sizes/ModalDelete.vue';

export default Vue.extend({
  name: 'AdminSizes',

  components: {
    FilterBar,
    SizeList,
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
        data: { items: sizes, meta },
      } = await ctx.$services.sizes.index(params);
      return { sizes, meta };
    } catch (error) {
      ctx.$sentry.captureException(error);
      return { sizes: [], meta: {} };
    }
  },

  data() {
    return {
      sizes: [] as Size[],
      meta: {} as ApiMeta,
      deletingSizeId: -1,
    };
  },

  computed: {
    deletingSize(): Size {
      return (
        this.sizes.find((size) => size.id === this.deletingSizeId) ||
        ({} as Size)
      );
    },
  },

  watchQuery: ['page', 'limit', 'search'],

  methods: {
    formatFilterParams,
    formatSortParams,
    separateParams,

    getDeletingSizeId(id: number) {
      this.deletingSizeId = id;
    },

    deleteSize() {
      this.sizes = this.sizes.filter((size) => {
        return size.id !== this.deletingSizeId;
      });
      if (this.sizes.length === 0 && this.meta.currentPage > 1) {
        this.$router.push(
          this.localePath({
            name: 'admin-sizes',
            query: { page: (this.meta.currentPage - 1) as unknown as string },
          })
        );
      }
    },
  },
});
</script>
