<template>
  <div class="d-flex flex-column">
    <div class="text-super font-weight-bold">
      {{ $t('sidebar.product.category') }}
    </div>
    <div class="mt-2">{{ $t('adminCategories.subtitle') }}</div>
    <FilterBar class="mt-4" />
    <CategoryList
      v-if="categories.length"
      :categories="categories"
      class="mt-4"
      @deleting-category-id="getDeletingCategoryId"
    />
    <Pagination v-if="categories.length" :meta="meta" class="mt-2" />
    <div v-else class="d-flex flex-column align-items-center mt-5">
      <NoData style="width: 400px" />
      <div class="text-super font-weight-bold mt-3">
        {{ $t('adminCategories.empty.title') }}
      </div>
      <div class="mt-2">{{ $t('adminCategories.empty.description') }}</div>
      <b-button
        variant="primary"
        class="d-flex align-items-center mt-4"
        style="min-width: fit-content"
        @click="$router.push(localePath({ name: 'admin-categories-new' }))"
      >
        <IconPlus class="mr-2" />
        {{ $t('adminCategories.filterBar.addNewCategory') }}
      </b-button>
    </div>
    <ModalDelete
      :deleting-category="deletingCategory"
      @delete="deleteCategory"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import FilterBar from '~/components/admin/categories/FilterBar.vue';
import CategoryList from '~/components/admin/categories/CategoryList.vue';
import Pagination from '~/components/admin/common/Pagination.vue';
import NoData from '~/components/icons/NoData.vue';
import IconPlus from '~/components/icons/IconPlus.vue';
import ModalDelete from '~/components/admin/categories/ModalDelete.vue';
import { ApiRequestParams, ApiMeta } from '~/types/api';
import { Category } from '~/types/Category';
import {
  formatFilterParams,
  formatSortParams,
  separateParams,
} from '~/utils/formatParams';

export default Vue.extend({
  name: 'AdminCategories',

  components: {
    FilterBar,
    CategoryList,
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
        data: { items: categories, meta },
      } = await ctx.$services.categories.index(params);
      return { categories, meta };
    } catch (error) {
      ctx.$sentry.captureException(error);
      return { categories: [], meta: {} };
    }
  },

  data() {
    return {
      categories: [] as Category[],
      meta: {} as ApiMeta,
      deletingCategoryId: -1,
    };
  },

  computed: {
    deletingCategory(): Category {
      return (
        this.categories.find(
          (category) => category.id === this.deletingCategoryId
        ) || ({} as Category)
      );
    },
  },

  watchQuery: ['page', 'limit', 'search', 'status'],

  methods: {
    formatFilterParams,
    formatSortParams,
    separateParams,

    getDeletingCategoryId(id: number) {
      this.deletingCategoryId = id;
    },

    deleteCategory() {
      this.categories = this.categories.filter((category) => {
        return category.id !== this.deletingCategoryId;
      });
      if (this.categories.length === 0 && this.meta.currentPage > 1) {
        this.$router.push(
          this.localePath({
            name: 'admin-categories',
            query: { page: (this.meta.currentPage - 1) as unknown as string },
          })
        );
      }
    },
  },
});
</script>
