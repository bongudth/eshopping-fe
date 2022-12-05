<template>
  <b-modal
    id="modal-add-product"
    centered
    :title="$t('adminReceipts.new.addProduct')"
    ok-variant="primary"
    cancel-variant="outline-secondary"
    @ok="addProduct"
    @hide="resetForm"
  >
    <div class="d-flex flex-column">
      <b-form-group
        :label="$t('adminReceipts.new.product.title')"
        label-for="input-product-name"
        class="mb-3"
      >
        <v-select
          label="name"
          :options="searchProducts"
          :filterable="false"
          :placeholder="$t('adminReceipts.new.product.searchAndSelectProduct')"
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
              {{ $t('adminReceipts.new.product.loadMoreProduct') }}
            </div>
          </template>
        </v-select>
      </b-form-group>
      <b-form-group
        :label="$t('adminReceipts.new.product.size')"
        label-for="input-size-id"
        class="mb-3"
      >
        <b-form-select
          id="input-size-id"
          v-model="form.productSizeId"
          required
          :options="sizeOptions"
          :placeholder="$t('adminReceipts.new.product.selectSize')"
        >
        </b-form-select>
      </b-form-group>
      <div class="row">
        <b-form-group
          :label="$t('adminReceipts.new.product.quantity')"
          label-for="input-size-quantity"
          class="col"
        >
          <b-form-input
            id="input-size-quantity"
            v-model="form.quantity"
            type="number"
            min="0"
            :placeholder="$t('adminReceipts.new.product.enterQuantity')"
            number
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :label="$t('adminReceipts.new.product.price')"
          label-for="input-price"
          class="col"
        >
          <b-input-group append="VND">
            <b-form-input
              id="input-price"
              v-model="form.price"
              type="number"
              min="1"
              :placeholder="$t('adminReceipts.new.product.enterPrice')"
              number
              required
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </div>
      <b-form-group :label="$t('adminReceipts.new.product.total')">
        <b-input-group append="VND">
          <b-form-input v-model="total" readonly></b-form-input>
        </b-input-group>
      </b-form-group>
    </div>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { ApiMeta } from '~/types/api';
import { PostReceiptProduct } from '~/types/Receipt';
import { Product } from '~/types/Product';
import { Option } from '~/types/Option';

export default Vue.extend({
  name: 'ModalAdd',

  data() {
    return {
      form: {
        productSizeId: 0,
        quantity: 0,
        price: 0,
      } as PostReceiptProduct,
      product: {} as Product,
      observerProduct: null as unknown as IntersectionObserver,
      pageProduct: 1,
      searchProduct: '',
      searchProducts: [] as Product[],
      productMeta: {} as ApiMeta,
      sizeOptions: [] as Option[],
    };
  },

  computed: {
    total(): number {
      return this.form.quantity * this.form.price;
    },

    hasNextPageProduct(): boolean {
      return this.productMeta.currentPage < this.productMeta.totalPages;
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
  },

  mounted() {
    this.observerProduct = new IntersectionObserver(this.infiniteScrollProduct);
  },

  methods: {
    changeSearchProduct(search: string) {
      this.searchProduct = search;
    },

    async replaceSearchProducts() {
      this.pageProduct = 1;
      this.searchProducts = await this.loadSearchProducts();
    },

    async pushSearchProducts() {
      const newProducts = await this.loadSearchProducts();
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

    selectProduct(product: Product) {
      this.product = product;
      this.sizeOptions = product.productSizes.map((productSize) => ({
        value: productSize.id,
        text: productSize.size.name,
      }));
    },

    addProduct() {
      const newReceiptProduct = {
        id: this.form.productSizeId,
        image: this.product.images.length
          ? this.product.images[0].url
          : 'https://www.democraciacristajovem.org.br/wp-content/themes/dc_jovem2022/assets/images/default.jpg',
        name: this.product.name,
        category: this.product.category.name,
        size: this.sizeOptions.find(
          (option) => option.value === this.form.productSizeId
        )?.text,
        quantity: this.form.quantity,
        price: this.form.price,
      };
      this.$emit('add', newReceiptProduct, this.form);
    },

    resetForm() {
      this.form = {
        productSizeId: 0,
        quantity: 0,
        price: 0,
      };
      this.product = {} as Product;
      this.sizeOptions = [];
    },
  },
});
</script>
