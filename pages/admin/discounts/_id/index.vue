<template>
  <b-form class="d-flex flex-column">
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <IconLeft
          class="cursor-pointer"
          @click.native="$router.push(localePath({ name: 'admin-discounts' }))"
        />
        <div class="text-super font-weight-bold ml-3">
          {{ discount.name }}
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div class="w-100 d-flex flex-column">
        <div class="form-section">
          <div v-b-toggle.discount-information class="section-title">
            <div>
              {{ $t('adminDiscounts.new.information.title') }}
            </div>
            <IconUp class="section-icon" />
          </div>
          <b-collapse id="discount-information" visible>
            <div class="row">
              <b-form-group
                :label="$t('adminDiscounts.new.information.name')"
                label-for="input-name"
                class="col"
              >
                <b-form-input
                  id="input-name"
                  v-model="discount.name"
                  readonly
                ></b-form-input>
              </b-form-group>
              <b-form-group
                :label="$t('adminDiscounts.new.information.percent')"
                label-for="input-percent"
                class="col"
              >
                <b-input-group append="%">
                  <b-form-input
                    id="input-percent"
                    v-model="discount.percent"
                    readonly
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </div>
            <div class="row">
              <b-form-group
                :label="$t('adminDiscounts.new.information.fromDay')"
                label-for="input-from-day"
                class="col"
              >
                <b-form-datepicker
                  id="input-from-day"
                  v-model="discount.fromDay"
                  readonly
                ></b-form-datepicker>
              </b-form-group>
              <b-form-group
                :label="$t('adminDiscounts.new.information.fromTime')"
                label-for="input-from-time"
                class="col"
              >
                <b-form-timepicker
                  id="input-from-time"
                  v-model="discount.fromTime"
                  readonly
                ></b-form-timepicker>
              </b-form-group>
            </div>
            <div class="row">
              <b-form-group
                :label="$t('adminDiscounts.new.information.toDay')"
                label-for="input-to-day"
                class="col"
              >
                <b-form-datepicker
                  id="input-to-day"
                  v-model="discount.toDay"
                  readonly
                ></b-form-datepicker>
              </b-form-group>
              <b-form-group
                :label="$t('adminDiscounts.new.information.toTime')"
                label-for="input-to-time"
                class="col"
              >
                <b-form-timepicker
                  id="input-to-time"
                  v-model="discount.toTime"
                  readonly
                ></b-form-timepicker>
              </b-form-group>
            </div>
          </b-collapse>
        </div>
        <div v-if="discount.products.length" class="form-section">
          <div v-b-toggle.discount-product class="section-title">
            <div>
              {{ $t('adminDiscounts.new.product.title') }}
            </div>
            <IconUp class="section-icon" />
          </div>
          <b-collapse id="discount-product" visible>
            <ProductList
              :products="discount.products"
              :percent="discount.percent"
            />
          </b-collapse>
        </div>
      </div>
    </div>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import { Discount } from '~/types/Discount';
import IconLeft from '~/components/icons/IconLeft.vue';
import IconUp from '~/components/icons/IconUp.vue';
import ProductList from '~/components/admin/discounts/ProductList.vue';

export default Vue.extend({
  name: 'EditDiscount',

  components: {
    IconLeft,
    IconUp,
    ProductList,
  },

  layout: 'dashboard',

  middleware: 'auth',

  async asyncData(ctx: Context) {
    if (!ctx.params.id) return { form: null };

    try {
      const { data: discount } = await ctx.$services.discounts.show(
        ctx.params.id
      );

      return { discount };
    } catch (error) {
      ctx.$sentry.captureException(error);
      return { discount: null };
    }
  },

  data() {
    return {
      discount: {} as Discount,
    };
  },
});
</script>
