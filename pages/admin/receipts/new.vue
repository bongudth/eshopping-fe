<template>
  <ValidationObserver v-slot="{ handleSubmit }" ref="validator">
    <b-form
      class="d-flex flex-column"
      @submit.prevent="handleSubmit(postReceipt)"
    >
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <IconLeft
            class="cursor-pointer"
            @click.native="$router.push(localePath({ name: 'admin-receipts' }))"
          />
          <div class="text-super font-weight-bold ml-3">
            {{ $t('adminReceipts.new.title') }}
          </div>
        </div>
        <b-button
          type="submit"
          variant="primary"
          style="min-width: fit-content"
          class="ml-3"
        >
          {{ $t('adminReceipts.new.publish') }}
        </b-button>
      </div>
      <div class="d-flex">
        <div class="w-100 d-flex flex-column">
          <div class="form-section">
            <div v-b-toggle.receipt-product class="section-title">
              <div>
                {{ $t('adminReceipts.new.product.title') }}
              </div>
              <IconUp class="section-icon" />
            </div>
            <b-collapse id="receipt-product" visible>
              <ProductList :products="products" @remove="removeProduct" />
              <b-button
                block
                variant="outline-primary"
                class="d-flex align-items-center justify-content-center mt-2"
                @click="$bvModal.show('modal-add-product')"
              >
                <IconPlus class="mr-2" />
                {{ $t('adminReceipts.new.addProduct') }}
              </b-button>
              <ModalAdd @add="addProduct" />
            </b-collapse>
          </div>
        </div>
      </div>
    </b-form>
  </ValidationObserver>
</template>

<script lang="ts">
import Vue from 'vue';
import { PostReceiptProduct, PostReceipt } from '~/types/Receipt';
import IconLeft from '~/components/icons/IconLeft.vue';
import IconUp from '~/components/icons/IconUp.vue';
import IconPlus from '~/components/icons/IconPlus.vue';
import ProductList from '~/components/admin/receipts/ProductList.vue';
import ModalAdd from '~/components/admin/receipts/ModalAdd.vue';

export default Vue.extend({
  name: 'NewReceipt',

  components: {
    IconLeft,
    IconUp,
    IconPlus,
    ProductList,
    ModalAdd,
  },

  layout: 'dashboard',

  middleware: 'auth',

  data() {
    return {
      form: {
        products: [],
        note: '',
      } as PostReceipt,
      products: [] as any[],
    };
  },

  methods: {
    addProduct(
      newReceiptProduct: PostReceiptProduct,
      receiptProduct: PostReceiptProduct
    ) {
      this.products.push(newReceiptProduct);
      this.form.products.push(receiptProduct);
    },

    removeProduct(id: number) {
      try {
        this.form.products = this.form.products.filter((product) => {
          return product.productSizeId !== id;
        });
        this.products = this.products.filter((product) => {
          return product.id !== id;
        });
        this.$bvToast.toast(
          this.$t('adminReceipts.new.product.remove.success') as string,
          {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          }
        );
      } catch (error) {
        this.$bvToast.toast(
          this.$t('adminReceipts.new.product.remove.error') as string,
          {
            title: this.$t('toastTitle.error') as string,
            variant: 'error',
          }
        );
      }
    },

    postReceipt() {
      this.$axios
        .$post('/receipts', this.form)
        .then(() => {
          this.$bvToast.toast(this.$t('adminReceipts.new.success') as string, {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          });
          this.$router.push(this.localePath({ name: 'admin-receipts' }));
        })
        .catch(() => {
          this.$bvToast.toast(this.$t('adminReceipts.new.error') as string, {
            title: this.$t('toastTitle.error') as string,
            variant: 'danger',
          });
        });
    },
  },
});
</script>
