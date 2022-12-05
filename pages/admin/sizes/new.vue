<template>
  <ValidationObserver v-slot="{ handleSubmit }" ref="validator">
    <b-form class="d-flex flex-column" @submit.prevent="handleSubmit(postSize)">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <IconLeft
            class="cursor-pointer"
            @click.native="$router.push(localePath({ name: 'admin-sizes' }))"
          />
          <div class="text-super font-weight-bold ml-3">
            {{ $t('adminSizes.new.title') }}
          </div>
        </div>
        <b-button
          type="submit"
          variant="primary"
          style="min-width: fit-content"
          class="ml-3"
        >
          {{ $t('adminSizes.new.publish') }}
        </b-button>
      </div>
      <div class="d-flex">
        <div class="w-100 d-flex flex-column">
          <div class="form-section">
            <div v-b-toggle.size-information class="section-title">
              <div>
                {{ $t('adminSizes.new.information.title') }}
              </div>
              <IconUp class="section-icon" />
            </div>
            <b-collapse id="size-information" visible>
              <ValidationProvider
                v-slot="{ validated, passed, errors }"
                vid="form.name"
                rules="required"
                :name="$t('adminSizes.new.information.name')"
                ><b-form-group
                  :label="$t('adminSizes.new.information.name')"
                  :invalid-feedback="errors[0]"
                  label-for="input-name"
                >
                  <b-form-input
                    id="input-name"
                    v-model="form.name"
                    type="text"
                    :state="validated ? passed : null"
                    :placeholder="$t('adminSizes.new.information.enterName')"
                    trim
                    required
                  ></b-form-input>
                </b-form-group>
              </ValidationProvider>
            </b-collapse>
          </div>
        </div>
      </div>
    </b-form>
  </ValidationObserver>
</template>

<script lang="ts">
import Vue from 'vue';
import { PostSize } from '~/types/Size';
import IconLeft from '~/components/icons/IconLeft.vue';
import IconUp from '~/components/icons/IconUp.vue';

export default Vue.extend({
  name: 'NewSize',

  components: {
    IconLeft,
    IconUp,
  },

  layout: 'dashboard',

  middleware: 'auth',

  data() {
    return {
      form: {
        name: '',
      } as PostSize,
    };
  },

  methods: {
    postSize() {
      this.$axios
        .$post('/sizes', this.form)
        .then(() => {
          this.$bvToast.toast(this.$t('adminSizes.new.success') as string, {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          });
          this.$router.push(this.localePath({ name: 'admin-sizes' }));
        })
        .catch(() => {
          this.$bvToast.toast(this.$t('adminSizes.new.error') as string, {
            title: this.$t('toastTitle.error') as string,
            variant: 'danger',
          });
        });
    },
  },
});
</script>
