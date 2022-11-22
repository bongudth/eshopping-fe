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
        <div v-if="!isVerify" class="text-center text-super">
          {{ $t('confirmEmail.confirmEmail') }}
        </div>
        <div v-else class="text-super text-center mb-4">
          {{ $t('confirmEmail.setupPassword') }}
        </div>

        <form
          v-if="isVerify"
          class="form__container"
          @submit.prevent.stop="handleSubmit(setPassword)"
        >
          <ValidationProvider
            v-slot="{ errors }"
            vid="password"
            rules="required|min:6"
          >
            <b-form-group
              :label="$t('confirmEmail.password')"
              label-for="input-password"
            >
              <b-form-input
                id="input-password"
                v-model="password"
                type="password"
                :state="password !== '' ? !errors[0] : null"
                :placeholder="$t('confirmEmail.enterYourPassword')"
                aria-describedby="password-error"
                trim
              />
              <b-form-invalid-feedback id="password-error">
                {{ $t('confirmEmail.pleaseEnterAtLeast6Characters') }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            vid="confirmed"
            rules="required|confirmed:password"
          >
            <b-form-group
              :label="$t('confirmEmail.confirmPassword')"
              label-for="input-confirm-password"
            >
              <b-form-input
                id="input-confirm-password"
                v-model="confirm"
                type="password"
                :state="confirm !== '' ? !errors[0] : null"
                :placeholder="$t('confirmEmail.enterYourConfirmPassword')"
                aria-describedby="confirm-error"
                trim
              />
              <b-form-invalid-feedback id="confirm-error">
                {{ $t('confirmEmail.passwordsDoNotMatch') }}
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
            {{ $t('confirmEmail.setupPassword') }}
          </b-button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import { HTTPResponse } from '@nuxtjs/auth-next';
import Vue from 'vue';
import IconLogo from '~/components/icons/IconLogo.vue';

export default Vue.extend({
  name: 'ConfirmEmail',

  components: { IconLogo },

  layout: 'auth',

  auth: 'guest',

  data() {
    return {
      isVerify: false,
      password: '',
      confirm: '',
      isLoading: false,
    };
  },

  async created() {
    if (this.isLoading) return;

    try {
      this.isLoading = true;

      const {
        data: { accessToken },
      } = (await this.$axios.$post('/auth/verify-email-token', {
        token: this.$route.query.token,
      })) as HTTPResponse;

      await this.$auth.setUserToken(accessToken);

      this.isVerify = true;

      this.$root.$bvToast.toast(
        this.$t('confirmEmail.verifySuccessfully') as string,
        {
          title: this.$t('toastTitle.success') as string,
          variant: 'success',
        }
      );
    } catch (error: any) {
      this.$router.push(this.localePath({ name: 'signup' }));

      this.$root.$bvToast.toast(
        this.$t('confirmEmail.verifyUnsuccessfully') as string,
        {
          title: this.$t('toastTitle.error') as string,
          variant: 'danger',
        }
      );
    } finally {
      this.isLoading = false;
    }
  },

  methods: {
    async setPassword() {
      if (this.isLoading) return;

      try {
        this.isLoading = true;
        this.$nuxt.$loading.start();

        const accessToken =
          this.$auth.$storage.getUniversal('auth._token.local');

        await this.$axios.$put(
          '/users/update-password',
          {
            password: this.password,
          },
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );

        this.$router.push(this.localePath({ name: 'index' }));

        this.$root.$bvToast.toast(
          this.$t('confirmEmail.setupPasswordSuccessfully') as string,
          {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          }
        );
      } catch (error: any) {
        this.password = '';
        this.confirm = '';

        this.$root.$bvToast.toast(
          this.$t('confirmEmail.setupPasswordUnsuccessfully') as string,
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
