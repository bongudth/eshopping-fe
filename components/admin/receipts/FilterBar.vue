<template>
  <b-button
    variant="primary"
    class="d-flex align-items-center"
    style="min-width: fit-content"
    @click="$router.push(localePath({ name: 'admin-receipts-new' }))"
  >
    <IconPlus class="mr-2" />
    {{ $t('adminReceipts.filterBar.importProduct') }}
  </b-button>
</template>

<script lang="ts">
import Vue from 'vue';
import IconPlus from '~/components/icons/IconPlus.vue';

export default Vue.extend({
  name: 'FilterBar',

  components: { IconPlus },
});
</script>
