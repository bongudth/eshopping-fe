<template>
  <b-navbar fixed="top" toggleable="sm" class="background-pink p-4">
    <b-navbar-toggle target="nav-collapse-admin"></b-navbar-toggle>

    <b-collapse id="nav-collapse-admin" is-nav>
      <b-navbar-nav class="ml-auto">
        <LangSwitcher />
        <AccountButton
          @click.native="$router.push(localePath({ name: 'account' }))"
        />
        <SignOutButton @click.native="signOut" />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';
import LangSwitcher from '~/components/common/LangSwitcher.vue';
import AccountButton from '~/components/common/AccountButton.vue';
import SignOutButton from '~/components/common/SignOutButton.vue';

export default Vue.extend({
  name: 'TheAdminHeader',

  components: {
    LangSwitcher,
    AccountButton,
    SignOutButton,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    async signOut() {
      if (this.isLoading) return;

      try {
        this.isLoading = true;
        this.$nuxt.$loading.start();

        await this.$auth.reset();

        this.$root.$bvToast.toast(
          this.$t('toastMessage.signOutSuccessful') as string,
          {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          }
        );
      } catch (error) {
        this.$root.$bvToast.toast(
          this.$t('toastMessage.signOutUnsuccessful') as string,
          {
            title: this.$t('toastTitle.error') as string,
            variant: 'danger',
          }
        );
      } finally {
        this.isLoading = false;
        this.$nuxt.$loading.finish();
      }
    },
  },
});
</script>
