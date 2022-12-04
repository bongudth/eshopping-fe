<template>
  <div class="d-flex background-pink justify-content-between rounded p-3">
    <div class="d-flex">
      <b-button
        variant="primary"
        class="d-flex align-items-center"
        style="min-width: fit-content"
        @click="$router.push(localePath({ name: 'admin-products-new' }))"
      >
        <IconPlus class="mr-2" />
        {{ $t('adminProducts.filterBar.addNewProduct') }}
      </b-button>
      <b-input-group
        class="
          background-white
          align-items-center
          rounded
          border border-secondary
          ml-3
          pr-2
        "
      >
        <b-form-input
          v-model="search"
          :placeholder="$t('adminProducts.filterBar.searchByProductName')"
          debounce="500"
          class="border-0"
          @change="filterSearch"
        >
        </b-form-input>
        <template #append>
          <IconSearch class="mx-1" />
        </template>
      </b-input-group>
    </div>
    <b-form-select
      v-model="status"
      plain
      :options="statuses"
      @change="filterStatus"
    ></b-form-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Option } from '~/types/Option';
import IconPlus from '~/components/icons/IconPlus.vue';
import IconSearch from '~/components/icons/IconSearch.vue';

export default Vue.extend({
  name: 'FilterBar',

  components: { IconPlus, IconSearch },

  data() {
    return {
      search: this.$route.query.search || '',
      status: this.$route.query.status || null,
      statuses: [
        { value: null, text: this.$t('adminProducts.filterBar.all') },
        { value: 'active', text: this.$t('adminProducts.filterBar.active') },
        {
          value: 'inactive',
          text: this.$t('adminProducts.filterBar.inactive'),
        },
      ] as Option[],
    };
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

    filterStatus() {
      this.$router.push({
        query: {
          ...this.$route.query,
          status: this.status,
          page: '1',
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.form-control {
  width: unset;

  &.border-0:focus {
    box-shadow: none;
  }
}

.input-group:focus {
  box-shadow: 0 0 0 0.2rem #ffdce6;
}
</style>
