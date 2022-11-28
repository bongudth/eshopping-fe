<template>
  <ValidationObserver
    v-slot="{ handleSubmit, invalid }"
    ref="validator"
    class="py-4 d-flex align-items-center justify-content-center m-h-inherit"
  >
    <form
      v-if="token"
      class="form-reset"
      @submit.prevent.stop="handleSubmit(onSubmit)"
    >
      <div class="text-center">
        <div class="display-4 brand-gradient mb-4">Nuxt Stater</div>
        <h3 class="h3">Hi {{ user.name }}!</h3>
        <p class="mb-3">{{ $t('resetPassword.instruction') }}</p>
        <b-alert :show="!!errorMsg" dismissible variant="danger">
          {{ errorMsg }}
        </b-alert>
      </div>
      <ValidationProvider
        v-slot="{ errors }"
        vid="password"
        :rules="{ required: true, regex: password_regex, max: 32 }"
        :name="$t('resetPassword.password')"
      >
        <b-form-group
          :label="$t('resetPassword.password')"
          :description="$t('resetPassword.passwordDescription')"
          label-for="password"
        >
          <b-form-input
            id="password"
            v-model="password"
            type="password"
            class="form-control password"
            autofocus=""
          />
          <b-form-invalid-feedback :state="!errors[0]">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors }"
        vid="re-password"
        rules="confirmed:password"
        :name="$t('resetPassword.passwordConfirmation')"
      >
        <b-form-group
          :label="$t('resetPassword.passwordConfirmation')"
          label-for="re-password"
        >
          <input
            id="re-password"
            v-model="passwordConfirmation"
            type="password"
            class="form-control password-confirmation"
          />
          <b-form-invalid-feedback :state="!errors[0]">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <button
        class="btn btn-lg btn-dark btn-block"
        type="submit"
        :disabled="isLoading || invalid"
      >
        {{ $t('resetPassword.submit') }}
      </button>
    </form>
    <div v-else class="text-center">
      <div class="text-super mb-4">{{ $t('resetPassword.failure.title') }}</div>
      <div class="mb-4">{{ $t('resetPassword.failure.message') }}</div>
      <div>{{ $t('resetPassword.failure.description') }}</div>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import Vue from 'vue';
import { PASSWORD_REGEX } from '~/config';

export default Vue.extend({
  name: 'ResetPassword',

  layout: 'auth',

  auth: 'guest',

  async asyncData(context: Context) {
    const { token } = context.query;
    const params = { token };
    try {
      const {
        data: { user },
      } = await context.$axios.$get('/reset_password', { params });
      return { token, user };
    } catch (error) {
      context.$sentry.captureException(error);
      return { token: null, user: null };
    }
  },

  data() {
    return {
      password_regex: PASSWORD_REGEX,
      token: '',
      user: {} as any,
      password: '',
      passwordConfirmation: '',
      isLoading: false,
      errorMsg: '',
    };
  },

  methods: {
    onSubmit() {
      if (!this.token || this.isLoading) return;

      this.isLoading = true;
      this.errorMsg = '';
      this.$nuxt.$loading.start();
      this.$axios
        .$put('reset_password', {
          token: this.token,
          password: this.password,
        })
        .then(() => {
          this.$root.$bvToast.toast(
            this.$t('resetPassword.success') as string,
            {
              title: this.$t('toastTitle.success') as string,
              variant: 'success',
              autoHideDelay: 5000,
            }
          );
          this.$router.push({
            path: this.localePath('/signin'),
            query: { email: this.user.email },
          });
        })
        .catch((error) => {
          this.isLoading = false;
          const firstMessage = error.response?.data?.errors[0]?.message;
          const commonMessage = error.response?.data?.message;
          this.errorMsg = firstMessage ?? commonMessage ?? error.message;
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.form-reset {
  width: 25rem;
}
</style>
