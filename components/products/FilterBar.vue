<template>
  <div class="filter-bar__container d-flex flex-column align-items-center">
    <div class="filter__search background-white d-flex shadow p-2">
      <b-form-input
        v-model="search"
        :placeholder="$t('products.filterBar.searchSomething')"
        @keyup.enter="filterSearch"
      ></b-form-input>
      <SearchButton @click.native="filterSearch" />
    </div>
    <div
      class="
        filter__advance
        w-100
        d-flex
        align-items-center
        justify-content-between
      "
    >
      <div class="filter__select d-flex">
        <v-select
          v-model="category"
          label="name"
          :options="searchCategories"
          :filterable="false"
          :clearable="false"
          :searchable="false"
          class="plain"
          @open="onOpenCategory"
          @close="onCloseCategory"
          @input="filterCategory"
        >
          <template #list-footer>
            <div
              v-show="hasNextPageCategory"
              ref="loadCategory"
              class="text-center"
            >
              {{ $t('products.category.loadMoreCategories') }}
            </div>
          </template>
        </v-select>
        <b-form-select
          v-model="price"
          plain
          :options="prices"
          @change="sortPrice"
        ></b-form-select>
      </div>
      <div class="filter__text d-flex">
        <b-link
          :class="$route.query.createdAt ? 'text-primary' : ''"
          @click="sortCreatedAt"
        >
          {{ $t('products.filterBar.latest') }}
        </b-link>
        <div>{{ $t('products.filterBar.bestSeller') }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchButton from '~/components/common/SearchButton.vue';
import { ApiMeta } from '~/types/api';
import { Option } from '~/types/Option';
import { Category } from '~/types/Category';

export default Vue.extend({
  name: 'FilterBar',

  components: { SearchButton },

  data() {
    return {
      search: this.$route.query.search || '',
      category:
        this.$route.query.category ||
        this.$t('products.category.allCategories'),
      observerCategory: null as unknown as IntersectionObserver,
      pageCategory: 1,
      searchCategories: [] as Category[],
      categoryMeta: {} as ApiMeta,
      price: this.$route.query.price || null,
      prices: [
        { value: null, text: this.$t('products.price.allPrices') },
        { value: 'asc', text: this.$t('products.price.priceAscending') },
        { value: 'desc', text: this.$t('products.price.priceDescending') },
      ] as Option[],
    };
  },

  computed: {
    hasNextPageCategory(): boolean {
      return this.categoryMeta.currentPage < this.categoryMeta.totalPages;
    },
  },

  watch: {
    searchCategory: {
      handler: 'replaceSearchCategories',
      immediate: true,
    },

    pageCategory: {
      handler() {
        if (this.pageCategory > 1) {
          this.pushSearchCategories();
        }
      },
      immediate: true,
    },
  },

  mounted() {
    this.observerCategory = new IntersectionObserver(
      this.infiniteScrollCategory
    );
  },

  methods: {
    filterSearch() {
      this.$router.push({
        query: {
          ...this.$route.query,
          search: this.search,
          page: '1',
        },
      });
    },

    async replaceSearchCategories() {
      this.pageCategory = 1;
      this.searchCategories = await this.loadSearchCategories();
    },

    async pushSearchCategories() {
      const newCategories = await this.loadSearchCategories();
      this.searchCategories.push(...newCategories);
    },

    async loadSearchCategories() {
      const params = {
        page: this.pageCategory,
      };
      const {
        data: { items: categories, meta },
      } = await this.$services.categories.index(params);
      this.categoryMeta = meta;
      return categories;
    },

    async onOpenCategory() {
      if (this.hasNextPageCategory) {
        await this.$nextTick();
        this.observerCategory.observe(this.$refs.loadCategory as Element);
      }
    },

    onCloseCategory() {
      this.observerCategory.disconnect();
    },

    async infiniteScrollCategory([
      { isIntersecting, target },
    ]: IntersectionObserverEntry[]) {
      if (isIntersecting) {
        this.pageCategory += 1;
        await this.$nextTick();
        const { offsetParent } = target as any;
        const { scrollTop } = offsetParent;
        await this.$nextTick();
        offsetParent.scrollTop = scrollTop;
      }
    },

    filterCategory(category: Category) {
      this.$router.push({
        query: {
          ...this.$route.query,
          category: category.name,
          page: '1',
        },
      });
    },

    sortPrice() {
      this.$router.push({
        query: {
          ...this.$route.query,
          price: this.price,
          page: '1',
        },
      });
    },

    sortCreatedAt() {
      this.$router.push({
        query: {
          ...this.$route.query,
          createdAt: 'desc',
          page: '1',
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.filter-bar__container {
  width: 300px;
  gap: 50px;
  margin-bottom: 100px;

  @include media-breakpoint-up(md) {
    width: 650px;
  }

  @include media-breakpoint-up(xl) {
    width: 1000px;
  }

  .form-control {
    border: none;

    &:focus {
      box-shadow: none;
    }
  }

  .filter__search {
    width: 100%;
    border-radius: 50px;

    @include media-breakpoint-up(xl) {
      width: 70%;
    }
  }

  .filter__advance {
    flex-direction: column;
    gap: 20px;

    @include media-breakpoint-up(md) {
      flex-direction: row;
      gap: 0;
    }

    .filter__select {
      gap: 20px;

      .form-control {
        width: fit-content;
        background-color: transparent;
        padding: 0;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
          color: $primary;
        }
      }
    }

    .filter__text {
      div {
        cursor: pointer;

        &:not(:last-child) {
          padding-right: 20px;
          border-right: 1px solid $secondary;
        }

        &:not(:first-child) {
          padding-left: 20px;
        }

        &:hover {
          color: $primary;
        }
      }
    }
  }
}
</style>
