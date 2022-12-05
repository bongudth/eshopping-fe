<template>
  <ValidationObserver v-slot="{ handleSubmit }" ref="validator">
    <b-form
      class="d-flex flex-column"
      @submit.prevent="handleSubmit(putCategory)"
    >
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <IconLeft
            class="cursor-pointer"
            @click.native="
              $router.push(localePath({ name: 'admin-categories' }))
            "
          />
          <div class="text-super font-weight-bold ml-3">
            {{ $t('adminCategories.edit.title') }}
          </div>
        </div>
        <b-button
          type="submit"
          variant="primary"
          style="min-width: fit-content"
          class="ml-3"
        >
          {{ $t('adminCategories.edit.update') }}
        </b-button>
      </div>
      <div class="d-flex">
        <div class="w-100 d-flex flex-column">
          <div class="form-section">
            <div v-b-toggle.category-information class="section-title">
              <div>
                {{ $t('adminCategories.new.information.title') }}
              </div>
              <IconUp class="section-icon" />
            </div>
            <b-collapse id="category-information" visible>
              <ValidationProvider
                v-slot="{ validated, passed, errors }"
                vid="form.name"
                rules="required"
                :name="$t('adminCategories.new.information.name')"
                ><b-form-group
                  :label="$t('adminCategories.new.information.name')"
                  :invalid-feedback="errors[0]"
                  label-for="input-name"
                >
                  <b-form-input
                    id="input-name"
                    v-model="form.name"
                    type="text"
                    :state="validated ? passed : null"
                    :placeholder="
                      $t('adminCategories.new.information.enterName')
                    "
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
import { Context } from '@nuxt/types';
import { HTTPResponse } from '@nuxtjs/auth-next';
import { PostCategory } from '~/types/Category';
import IconLeft from '~/components/icons/IconLeft.vue';
import IconUp from '~/components/icons/IconUp.vue';

export default Vue.extend({
  name: 'EditCategory',

  components: {
    IconLeft,
    IconUp,
  },

  layout: 'dashboard',

  middleware: 'auth',

  async asyncData(ctx: Context) {
    if (!ctx.params.id) return { form: null };

    try {
      const { data } = (await ctx.$axios.$get(
        `/categories/${ctx.params.id}`
      )) as HTTPResponse;

      const form: PostCategory = {
        name: data.name,
      };
      return { form, categoryId: data.id };
    } catch (error) {
      ctx.$sentry.captureException(error);
      return { form: null, categoryId: null };
    }
  },

  data() {
    return {
      categoryId: null as number | null,
      form: {
        name: '',
      } as PostCategory,
    };
  },

  methods: {
    putCategory() {
      this.$axios
        .$put(`/categories/${this.categoryId}`, this.form)
        .then(() => {
          this.$bvToast.toast(
            this.$t('adminCategories.edit.success') as string,
            {
              title: this.$t('toastTitle.success') as string,
              variant: 'success',
            }
          );
          this.$router.push(this.localePath({ name: 'admin-categories' }));
        })
        .catch(() => {
          this.$bvToast.toast(this.$t('adminCategories.edit.error') as string, {
            title: this.$t('toastTitle.error') as string,
            variant: 'danger',
          });
        });
    },
  },
});
</script>
