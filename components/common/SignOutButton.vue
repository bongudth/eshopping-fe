<template>
  <div class="button-icon d-flex align-items-center rounded-pill p-2">
    <IconSignOut />
    <div class="button-icon__title ml-2">{{ $t('headerBar.signOut') }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconSignOut from '~/components/icons/IconSignOut.vue';

export default Vue.extend({
  name: 'SignOutButton',

  components: { IconSignOut },
});
</script>
