<template>
  <div
    class="
      auth__container
      w-100
      h-screen
      background-pink
      d-flex
      align-items-center
    "
  >
    <div class="auth__background d-flex">
      <div class="auth__logo">
        <IconLogo @click.native="$router.push(localePath({ name: 'index' }))" />
      </div>
      <img src="@/static/shopping-woman.png" alt="shopping woman" />
    </div>
    <div class="auth__content">
      <ValidationObserver
        v-slot="{ handleSubmit, invalid }"
        ref="validator"
        class="
          auth__form
          background-white
          w-100
          h-100
          d-flex
          flex-column
          align-items-center
          justify-content-center
          shadow
        "
      >
        <div class="text-super text-center mb-4">
          {{ $t('forgotPassword.forgotPassword') }}
        </div>

        <form
          v-if="!isSentEmail"
          class="form__container"
          @submit.prevent.stop="handleSubmit(sendResetEmail)"
        >
          <ValidationProvider
            v-slot="{ errors }"
            vid="email"
            rules="required|email"
          >
            <b-form-group
              :label="$t('forgotPassword.emailAddress')"
              label-for="input-email"
            >
              <b-form-input
                id="input-email"
                v-model="email"
                type="email"
                :state="email !== '' ? !errors[0] : null"
                :placeholder="$t('forgotPassword.enterYourEmailAddress')"
                aria-describedby="email-error"
                trim
                autofocus
              />
              <b-form-invalid-feedback id="email-error">
                {{ $t('forgotPassword.pleaseEnterAValidEmailAddress') }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <b-button
            pill
            block
            variant="outline-primary"
            type="submit"
            :disabled="invalid"
            class="mb-4"
          >
            {{ $t('forgotPassword.sendResetEmail') }}
          </b-button>
          <div class="text-center">
            {{ $t('forgotPassword.notForgotPassword') }}
            <router-link :to="localeRoute({ name: 'signin' })">
              {{ $t('forgotPassword.signIn') }}
            </router-link>
          </div>
        </form>

        <div v-else class="text-center">
          <div class="text-primary text-large">
            {{ $t('forgotPassword.pleaseCheckYourEmail') }}
          </div>
          <div class="mt-2">
            {{ $t('forgotPassword.aResetPasswordEmail') }}
          </div>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconLogo from '~/components/icons/IconLogo.vue';

export default Vue.extend({
  name: 'ForgotPassword',

  components: { IconLogo },

  layout: 'auth',

  auth: 'guest',

  data() {
    return {
      email: '',
      isLoading: false,
      isSentEmail: false,
    };
  },

  methods: {
    async sendResetEmail() {
      if (this.isLoading) return;

      try {
        this.isLoading = true;
        this.$nuxt.$loading.start();

        await this.$axios
          .$post('/auth/reset-password', {
            email: this.email,
          })
          .then(() => {
            this.isSentEmail = true;
          });

        this.$root.$bvToast.toast(
          this.$t('forgotPassword.sendResetEmailSuccessfully') as string,
          {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          }
        );
      } catch (error: any) {
        this.email = '';

        if (error.statusCode === 409) {
          this.$root.$bvToast.toast(
            this.$t('forgotPassword.coundNotFindUser') as string,
            {
              title: this.$t('toastTitle.error') as string,
              variant: 'danger',
            }
          );
        } else {
          this.$root.$bvToast.toast(
            this.$t('forgotPassword.sendResetEmailUnsuccessfully') as string,
            {
              title: this.$t('toastTitle.error') as string,
              variant: 'danger',
            }
          );
        }
      } finally {
        this.isLoading = false;
        this.$nuxt.$loading.finish();
      }
    },
  },
});
</script>
