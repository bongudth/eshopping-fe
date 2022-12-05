<template>
  <ValidationObserver v-slot="{ handleSubmit }" ref="validator">
    <b-form
      class="d-flex flex-column"
      @submit.prevent="handleSubmit(putDiscount)"
    >
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <IconLeft
            class="cursor-pointer"
            @click.native="
              $router.push(localePath({ name: 'admin-discounts' }))
            "
          />
          <div class="text-super font-weight-bold ml-3">
            {{ $t('adminDiscounts.edit.title') }}
          </div>
        </div>
        <b-button
          type="submit"
          variant="primary"
          style="min-width: fit-content"
          class="ml-3"
        >
          {{ $t('adminDiscounts.edit.update') }}
        </b-button>
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
                <ValidationProvider
                  v-slot="{ validated, passed, errors }"
                  vid="form.name"
                  rules="required"
                  :name="$t('adminDiscounts.new.information.name')"
                  class="col"
                  ><b-form-group
                    :label="$t('adminDiscounts.new.information.name')"
                    :invalid-feedback="errors[0]"
                    label-for="input-name"
                  >
                    <b-form-input
                      id="input-name"
                      v-model="form.name"
                      type="text"
                      :state="validated ? passed : null"
                      :placeholder="
                        $t('adminDiscounts.new.information.enterName')
                      "
                      trim
                      required
                    ></b-form-input>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ validated, passed, errors }"
                  vid="form.percent"
                  rules="required"
                  :name="$t('adminDiscounts.new.information.percent')"
                  class="col-4"
                  min_value="1"
                  max_value="100"
                  ><b-form-group
                    :label="$t('adminDiscounts.new.information.percent')"
                    :invalid-feedback="errors[0]"
                    label-for="input-percent"
                  >
                    <b-input-group append="%">
                      <b-form-input
                        id="input-percent"
                        v-model="form.percent"
                        type="number"
                        min="1"
                        max="100"
                        step="1"
                        :state="validated ? passed : null"
                        :placeholder="
                          $t('adminDiscounts.new.information.enterPercent')
                        "
                        number
                        required
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </ValidationProvider>
              </div>
              <div class="row">
                <ValidationProvider
                  v-slot="{ validated, passed, errors }"
                  vid="form.fromDay"
                  rules="required"
                  :name="$t('adminDiscounts.new.information.fromDay')"
                  class="col"
                  ><b-form-group
                    :label="$t('adminDiscounts.new.information.fromDay')"
                    :invalid-feedback="errors[0]"
                    label-for="input-from-day"
                  >
                    <b-form-datepicker
                      id="input-from-day"
                      v-model="form.fromDay"
                      :max="form.toDay"
                      :state="validated ? passed : null"
                      :placeholder="
                        $t('adminDiscounts.new.information.chooseFromDay')
                      "
                      required
                    ></b-form-datepicker>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ validated, passed, errors }"
                  vid="form.fromTime"
                  rules="required"
                  :name="$t('adminDiscounts.new.information.fromTime')"
                  class="col-4"
                  ><b-form-group
                    :label="$t('adminDiscounts.new.information.fromTime')"
                    :invalid-feedback="errors[0]"
                    label-for="input-from-time"
                  >
                    <b-form-timepicker
                      id="input-from-time"
                      v-model="form.fromTime"
                      :state="validated ? passed : null"
                      :placeholder="
                        $t('adminDiscounts.new.information.chooseFromTime')
                      "
                      required
                    ></b-form-timepicker>
                  </b-form-group>
                </ValidationProvider>
              </div>
              <div class="row">
                <ValidationProvider
                  v-slot="{ validated, passed, errors }"
                  vid="form.toDay"
                  rules="required"
                  :name="$t('adminDiscounts.new.information.toDay')"
                  class="col"
                  ><b-form-group
                    :label="$t('adminDiscounts.new.information.toDay')"
                    :invalid-feedback="errors[0]"
                    label-for="input-to-day"
                  >
                    <b-form-datepicker
                      id="input-to-day"
                      v-model="form.toDay"
                      :min="form.fromDay"
                      :state="validated ? passed : null"
                      :placeholder="
                        $t('adminDiscounts.new.information.chooseToDay')
                      "
                      required
                    ></b-form-datepicker>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ validated, passed, errors }"
                  vid="form.toTime"
                  rules="required"
                  :name="$t('adminDiscounts.new.information.toTime')"
                  class="col-4"
                  ><b-form-group
                    :label="$t('adminDiscounts.new.information.toTime')"
                    :invalid-feedback="errors[0]"
                    label-for="input-to-time"
                  >
                    <b-form-timepicker
                      id="input-to-time"
                      v-model="form.toTime"
                      :state="validated ? passed : null"
                      :placeholder="
                        $t('adminDiscounts.new.information.chooseToTime')
                      "
                      required
                    ></b-form-timepicker>
                  </b-form-group>
                </ValidationProvider>
              </div>
            </b-collapse>
          </div>
          <div class="form-section">
            <div v-b-toggle.discount-product class="section-title">
              <div>
                {{ $t('adminDiscounts.new.product.title') }}
              </div>
              <IconUp class="section-icon" />
            </div>
            <b-collapse id="discount-product" visible>
              <v-select
                label="name"
                :options="searchProducts"
                :selectable="checkSelectableProduct"
                :filterable="false"
                :placeholder="
                  $t('adminDiscounts.new.product.searchAndSelectProduct')
                "
                class="mb-3"
                @open="onOpenProduct"
                @close="onCloseProduct"
                @search="changeSearchProduct"
                @input="selectProduct"
              >
                <template #list-footer>
                  <div
                    v-show="hasNextPageProduct"
                    ref="loadProduct"
                    class="text-center"
                  >
                    {{ $t('adminDiscounts.new.product.loadMoreProduct') }}
                  </div>
                </template>
              </v-select>
              <ProductList
                v-if="products.length"
                :products="products"
                :percent="form.percent"
                @remove="removeProduct"
              />
            </b-collapse>
          </div>
          <div class="form-section">
            <div v-b-toggle.discount-category class="section-title">
              <div>
                {{ $t('adminDiscounts.new.category.title') }}
              </div>
              <IconUp class="section-icon" />
            </div>
            <b-collapse id="discount-category" visible>
              <v-select
                label="name"
                :options="searchCategories"
                :selectable="checkSelectableCategory"
                :filterable="false"
                :placeholder="
                  $t('adminDiscounts.new.category.searchAndSelectCategory')
                "
                class="mb-3"
                @open="onOpenCategory"
                @close="onCloseCategory"
                @search="changeSearchCategory"
                @input="selectCategory"
              >
                <template #list-footer>
                  <div
                    v-show="hasNextPageCategory"
                    ref="loadCategory"
                    class="text-center"
                  >
                    {{ $t('adminDiscounts.new.category.loadMoreCategory') }}
                  </div>
                </template>
              </v-select>
              <CategoryList
                v-if="categories.length"
                :categories="categories"
                @remove="removeCategory"
              />
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
import { ApiMeta } from '~/types/api';
import { PostDiscount } from '~/types/Discount';
import { Product } from '~/types/Product';
import { Category } from '~/types/Category';
import IconLeft from '~/components/icons/IconLeft.vue';
import IconUp from '~/components/icons/IconUp.vue';
import ProductList from '~/components/admin/discounts/ProductList.vue';
import CategoryList from '~/components/admin/discounts/CategoryList.vue';

export default Vue.extend({
  name: 'EditDiscount',

  components: {
    IconLeft,
    IconUp,
    ProductList,
    CategoryList,
  },

  layout: 'dashboard',

  middleware: 'auth',

  async asyncData(ctx: Context) {
    if (!ctx.params.id) return { form: null };

    try {
      const { data: discount } = await ctx.$services.discounts.show(
        ctx.params.id
      );

      const form: PostDiscount = {
        name: discount.name,
        percent: discount.percent,
        fromDay: discount.fromDay,
        fromTime: discount.fromTime,
        toDay: discount.toDay,
        toTime: discount.toTime,
        productIds: discount.products.map((product) => product.id),
        categoryIds: [],
      };

      const { products } = discount;
      return { discountId: discount.id, form, products };
    } catch (error) {
      ctx.$sentry.captureException(error);
      return { discountId: null, form: null, products: null };
    }
  },

  data() {
    return {
      discountId: null as number | null,
      form: {} as PostDiscount,
      products: [] as Product[],
      observerProduct: null as unknown as IntersectionObserver,
      pageProduct: 1,
      searchProduct: '',
      searchProducts: [] as Product[],
      productMeta: {} as ApiMeta,
      categories: [] as Category[],
      observerCategory: null as unknown as IntersectionObserver,
      pageCategory: 1,
      searchCategory: '',
      searchCategories: [] as Category[],
      categoryMeta: {} as ApiMeta,
    };
  },

  computed: {
    hasNextPageProduct(): boolean {
      return this.productMeta.currentPage < this.productMeta.totalPages;
    },

    hasNextPageCategory(): boolean {
      return this.categoryMeta.currentPage < this.categoryMeta.totalPages;
    },
  },

  watch: {
    searchProduct: {
      handler: 'replaceSearchProducts',
      immediate: true,
    },

    pageProduct: {
      handler() {
        if (this.pageProduct > 1) {
          this.pushSearchProducts();
        }
      },
      immediate: true,
    },

    searchCategory: {
      handler: 'replaceSearchCategories',
      immediate: true,
    },

    pageCategory: {
      handler() {
        if (this.pageCategory > 1) {
          this.pushSearchCategories();
        }
      },
      immediate: true,
    },
  },

  mounted() {
    this.observerProduct = new IntersectionObserver(this.infiniteScrollProduct);
    this.observerCategory = new IntersectionObserver(
      this.infiniteScrollCategory
    );
  },

  methods: {
    changeSearchProduct(search: string) {
      this.searchProduct = search;
    },

    async replaceSearchProducts() {
      this.pageProduct = 1;
      const newProducts = (await this.loadSearchProducts()).filter(
        (product) => !this.form.productIds.includes(product.id)
      );
      this.searchProducts = newProducts;
    },

    async pushSearchProducts() {
      const newProducts = (await this.loadSearchProducts()).filter(
        (product) => !this.form.productIds.includes(product.id)
      );
      this.searchProducts.push(...newProducts);
    },

    async loadSearchProducts() {
      const params = {
        limit: 10,
        page: this.pageProduct,
        search: this.searchProduct,
      };
      const {
        data: { items: products, meta },
      } = await this.$services.products.index(params);
      this.productMeta = meta;
      return products;
    },

    async onOpenProduct() {
      if (this.hasNextPageProduct) {
        await this.$nextTick();
        this.observerProduct.observe(this.$refs.loadProduct as Element);
      }
    },

    onCloseProduct() {
      this.observerProduct.disconnect();
    },

    async infiniteScrollProduct([
      { isIntersecting, target },
    ]: IntersectionObserverEntry[]) {
      if (isIntersecting) {
        this.pageProduct += 1;
        await this.$nextTick();
        const { offsetParent } = target as any;
        const { scrollTop } = offsetParent;
        await this.$nextTick();
        offsetParent.scrollTop = scrollTop;
      }
    },

    checkSelectableProduct(product: Product) {
      return (
        !this.form.productIds.includes(product.id) && !product.discount.length
      );
    },

    selectProduct(product: Product) {
      try {
        this.form.productIds.push(product.id);
        this.products.push(product);
        this.$bvToast.toast(
          this.$t('adminDiscounts.new.product.add.success') as string,
          {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          }
        );
      } catch (error) {
        this.$bvToast.toast(
          this.$t('adminDiscounts.new.product.add.error') as string,
          {
            title: this.$t('toastTitle.error') as string,
            variant: 'error',
          }
        );
      }
    },

    removeProduct(id: number) {
      try {
        this.form.productIds = this.form.productIds.filter((productId) => {
          return productId !== id;
        });
        this.products = this.products.filter((product) => {
          return product.id !== id;
        });
        this.$bvToast.toast(
          this.$t('adminDiscounts.new.product.remove.success') as string,
          {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          }
        );
      } catch (error) {
        this.$bvToast.toast(
          this.$t('adminDiscounts.new.product.remove.error') as string,
          {
            title: this.$t('toastTitle.error') as string,
            variant: 'error',
          }
        );
      }
    },

    changeSearchCategory(search: string) {
      this.searchCategory = search;
    },

    async replaceSearchCategories() {
      this.pageCategory = 1;
      const newCategories = (await this.loadSearchCategories()).filter(
        (category) => !this.form.categoryIds.includes(category.id)
      );
      this.searchCategories = newCategories;
    },

    async pushSearchCategories() {
      const newCategories = (await this.loadSearchCategories()).filter(
        (category) => !this.form.categoryIds.includes(category.id)
      );
      this.searchCategories.push(...newCategories);
    },

    async loadSearchCategories() {
      const params = {
        limit: 10,
        page: this.pageCategory,
        search: this.searchCategory,
      };
      const {
        data: { items: categories, meta },
      } = await this.$services.categories.index(params);
      this.categoryMeta = meta;
      return categories;
    },

    async onOpenCategory() {
      if (this.hasNextPageCategory) {
        await this.$nextTick();
        this.observerCategory.observe(this.$refs.loadCategory as Element);
      }
    },

    onCloseCategory() {
      this.observerCategory.disconnect();
    },

    async infiniteScrollCategory([
      { isIntersecting, target },
    ]: IntersectionObserverEntry[]) {
      if (isIntersecting) {
        this.pageCategory += 1;
        await this.$nextTick();
        const { offsetParent } = target as any;
        const { scrollTop } = offsetParent;
        await this.$nextTick();
        offsetParent.scrollTop = scrollTop;
      }
    },

    checkSelectableCategory(category: Category) {
      return !this.form.categoryIds.includes(category.id);
    },

    selectCategory(category: Category) {
      try {
        this.form.categoryIds.push(category.id);
        this.categories.push(category);
        this.$bvToast.toast(
          this.$t('adminDiscounts.new.category.add.success') as string,
          {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          }
        );
      } catch (error) {
        this.$bvToast.toast(
          this.$t('adminDiscounts.new.category.add.error') as string,
          {
            title: this.$t('toastTitle.error') as string,
            variant: 'error',
          }
        );
      }
    },

    removeCategory(id: number) {
      try {
        this.form.categoryIds = this.form.categoryIds.filter((categoryId) => {
          return categoryId !== id;
        });
        this.categories = this.categories.filter((category) => {
          return category.id !== id;
        });
        this.$bvToast.toast(
          this.$t('adminDiscounts.new.category.remove.success') as string,
          {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          }
        );
      } catch (error) {
        this.$bvToast.toast(
          this.$t('adminDiscounts.new.category.remove.error') as string,
          {
            title: this.$t('toastTitle.error') as string,
            variant: 'error',
          }
        );
      }
    },

    putDiscount() {
      this.$axios
        .$put(`/discounts/${this.discountId}`, this.form)
        .then(() => {
          this.$bvToast.toast(
            this.$t('adminDiscounts.edit.success') as string,
            {
              title: this.$t('toastTitle.success') as string,
              variant: 'success',
            }
          );
          this.$router.push(this.localePath({ name: 'admin-discounts' }));
        })
        .catch(() => {
          this.$bvToast.toast(this.$t('adminDiscounts.edit.error') as string, {
            title: this.$t('toastTitle.error') as string,
            variant: 'danger',
          });
        });
    },
  },
});
</script>
