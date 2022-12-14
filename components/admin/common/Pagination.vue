<template>
  <div class="d-flex align-items-center justify-content-between">
    <b-form-select
      v-model="limit"
      plain
      :options="limits"
      @change="changeLimit"
    ></b-form-select>
    <b-pagination-nav
      v-model="currentPage"
      :link-gen="linkGen"
      :number-of-pages="meta.totalPages"
      :per-page="meta.itemsPerPage"
      use-router
      limit="3"
    ></b-pagination-nav>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Option } from '~/types/Option';
import { ApiMeta } from '~/types/api';

export default Vue.extend({
  name: 'Pagination',

  props: {
    meta: {
      type: Object as PropType<ApiMeta>,
      required: true,
    },
  },

  data() {
    return {
      limit: this.$route.query.limit || 10,
      currentPage: this.meta.currentPage || 1,
      limits: [
        { value: 10, text: this.$t('pagination.tenItems') },
        { value: 20, text: this.$t('pagination.twentyItems') },
        { value: 30, text: this.$t('pagination.thirtyItems') },
      ] as Option[],
    };
  },

  watch: {
    meta: {
      handler() {
        this.currentPage = this.meta.currentPage;
      },
      deep: true,
    },
  },

  methods: {
    linkGen(page = 1) {
      return {
        query: {
          ...this.$route.query,
          page: String(page),
        },
      };
    },

    changeLimit() {
      this.$router.push({
        query: {
          ...this.$route.query,
          limit: this.limit as string,
          page: '1',
        },
      });
    },

    goToNextPage() {
      this.currentPage += 1;
      this.$router.push(this.linkGen(this.currentPage));
    },
  },
});
</script>

<style lang="scss" scoped>
.form-control {
  width: unset;
}
</style>
