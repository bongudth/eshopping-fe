<template>
  <div class="button-icon d-flex align-items-center rounded-pill p-2">
    <IconSignIn />
    <div class="button-icon__title ml-2">{{ $t('headerBar.signIn') }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconSignIn from '~/components/icons/IconSignIn.vue';

export default Vue.extend({
  name: 'SignInButton',

  components: { IconSignIn },
});
</script>
