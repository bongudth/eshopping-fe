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
          {{ $t('signin.welcomeBack') }}
        </div>

        <form
          class="form__container"
          @submit.prevent.stop="handleSubmit(signIn)"
        >
          <b-button
            pill
            block
            variant="outline-primary"
            class="d-flex align-items-center justify-content-center mb-4"
            type="button"
            @click="googleSignIn"
          >
            <img
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
              alt="Google logo"
              class="mr-2"
              width="24"
            />
            {{ $t('signin.signInWithGoogle') }}
          </b-button>

          <hr class="mb-4" />

          <ValidationProvider
            v-slot="{ errors }"
            vid="email"
            rules="required|email"
          >
            <b-form-group
              :label="$t('signin.emailAddress')"
              label-for="input-email"
            >
              <b-form-input
                id="input-email"
                v-model="email"
                type="email"
                :state="email !== '' ? !errors[0] : null"
                :placeholder="$t('signin.enterYourEmailAddress')"
                aria-describedby="email-error"
                trim
                autofocus
              />
              <b-form-invalid-feedback id="email-error">
                {{ $t('signin.pleaseEnterAValidEmailAddress') }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            vid="password"
            rules="required|min:6"
          >
            <b-form-group
              :label="$t('signin.password')"
              label-for="input-password"
            >
              <b-form-input
                id="input-password"
                v-model="password"
                type="password"
                :state="password !== '' ? !errors[0] : null"
                :placeholder="$t('signin.enterYourPassword')"
                aria-describedby="password-error"
                trim
              />
              <b-form-invalid-feedback id="password-error">
                {{ $t('signin.pleaseEnterAtLeast6Characters') }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <b-form-group id="input-group-4">
            <div class="d-flex align-items-center justify-content-between">
              <div class="custom-control custom-checkbox">
                <input
                  id="remember-me"
                  v-model="rememberMe"
                  type="checkbox"
                  value="remember-me"
                  class="custom-control-input"
                />
                <label for="remember-me" class="custom-control-label">
                  {{ $t('signin.rememberMe') }}
                </label>
              </div>

              <router-link :to="localeRoute({ name: 'forgot-password' })">
                {{ $t('signin.forgotPassword') }}
              </router-link>
            </div>
          </b-form-group>

          <b-button
            pill
            block
            variant="outline-primary"
            type="submit"
            :disabled="invalid"
            class="mb-4"
          >
            {{ $t('signin.signIn') }}
          </b-button>
          <div class="text-center">
            {{ $t('signin.dontHaveAnAccount') }}
            <router-link :to="localeRoute({ name: 'signup' })">
              {{ $t('signin.signUp') }}
            </router-link>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { HTTPResponse } from '@nuxtjs/auth-next';
import IconLogo from '~/components/icons/IconLogo.vue';

export default Vue.extend({
  name: 'SignIn',

  components: { IconLogo },

  layout: 'auth',

  auth: 'guest',

  data() {
    return {
      email: '',
      password: '',
      rememberMe: true,
      isLoading: false,
    };
  },

  methods: {
    async signIn() {
      if (this.isLoading) return;

      try {
        this.isLoading = true;
        this.$nuxt.$loading.start();

        const response = (await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })) as HTTPResponse;

        await this.$auth.setUserToken(response?.data?.data?.accessToken);

        this.$router.push(this.localePath({ name: 'index' }));

        this.$root.$bvToast.toast(
          this.$t('signin.signInSuccessful') as string,
          {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          }
        );
      } catch (error) {
        this.email = '';
        this.password = '';

        this.$root.$bvToast.toast(
          this.$t('signin.invalidCredentials') as string,
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

    googleSignIn() {
      this.$nuxt.$loading.start();

      this.$auth
        .loginWith('google', { params: { prompt: 'select_account' } })
        .catch((error) => {
          this.$root.$bvToast.toast(error.message, {
            title: 'Error',
            variant: 'danger',
          });
          this.$nuxt.$loading.finish();
        });
    },
  },
});
</script>
