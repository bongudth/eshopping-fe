<template>
  <b-button pill variant="outline-primary" class="d-flex align-items-center">
    <IconSearch />
    <div class="ml-2">{{ $t('button.search') }}</div>
  </b-button>
</template>

<script lang="ts">
import Vue from 'vue';
import IconSearch from '~/components/icons/IconSearch.vue';

export default Vue.extend({
  name: 'SearchButton',

  components: { IconSearch },
});
</script>

<style lang="scss" scoped>
.btn-outline-primary {
  div {
    display: none;

    @include media-breakpoint-up(xl) {
      display: block;
      white-space: nowrap;
    }
  }
}
</style>
