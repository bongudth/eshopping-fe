<template>
  <div>Admin</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';

export default Vue.extend({
  name: 'AdminDashboard',

  layout: 'dashboard',

  middleware: 'auth',

  asyncData(ctx: Context) {
    ctx.redirect(ctx.localePath({ name: 'admin-products' }));
  },
});
</script>
