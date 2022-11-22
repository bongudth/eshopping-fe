<template>
  <div
    class="
      pagination__container
      position-relative
      d-flex
      align-items-center
      justify-content-end
    "
  >
    <NextButton
      v-if="meta.currentPage < meta.totalPages"
      class="next-button position-absolute"
      @click.native.stop="goToNextPage"
    />
    <b-pagination-nav
      v-model="currentPage"
      pills
      :link-gen="linkGen"
      :number-of-pages="meta.totalPages"
      use-router
      limit="3"
    ></b-pagination-nav>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import NextButton from '~/components/common/NextButton.vue';
import { ApiMeta } from '~/types/api';

export default Vue.extend({
  name: 'Pagination',

  components: { NextButton },

  props: {
    meta: {
      type: Object as PropType<ApiMeta>,
      required: true,
    },
  },

  data() {
    return {
      currentPage: this.meta.currentPage || 1,
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

    goToNextPage() {
      this.currentPage += 1;
      this.$router.push(this.linkGen(this.currentPage));
    },
  },
});
</script>

<style lang="scss" scoped>
.pagination__container {
  width: 300px;
  height: 42px;
  margin-top: 100px;

  @include media-breakpoint-up(md) {
    width: 650px;
  }

  @include media-breakpoint-up(xl) {
    width: 1000px;
  }

  .next-button {
    display: none;

    @include media-breakpoint-up(md) {
      display: block;
      left: 0;
      transform: translateX(0);
    }

    @include media-breakpoint-up(xl) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
