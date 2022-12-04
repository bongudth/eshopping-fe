<template>
  <ValidationObserver v-slot="{ handleSubmit }" ref="validator">
    <b-form
      class="d-flex flex-column"
      @submit.prevent="handleSubmit(postProduct)"
    >
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <IconLeft
            class="cursor-pointer"
            @click.native="$router.push(localePath({ name: 'admin-products' }))"
          />
          <div class="text-super font-weight-bold ml-3">
            {{ $t('adminProducts.new.title') }}
          </div>
        </div>
        <b-button
          type="submit"
          variant="primary"
          style="min-width: fit-content"
          class="ml-3"
        >
          {{ $t('adminProducts.new.publish') }}
        </b-button>
      </div>
      <div class="d-flex">
        <div class="w-100 d-flex flex-column">
          <div class="form-section">
            <div v-b-toggle.product-information class="section-title">
              <div>
                {{ $t('adminProducts.new.information.title') }}
              </div>
              <IconUp class="section-icon" />
            </div>
            <b-collapse id="product-information" visible>
              <div class="form-row">
                <ValidationProvider
                  v-slot="{ validated, passed, errors }"
                  vid="form.name"
                  rules="required"
                  :name="$t('adminProducts.new.information.name')"
                  class="col"
                  ><b-form-group
                    :label="$t('adminProducts.new.information.name')"
                    :invalid-feedback="errors[0]"
                    label-for="input-name"
                  >
                    <b-form-input
                      id="input-name"
                      v-model="form.name"
                      type="text"
                      :state="validated ? passed : null"
                      :placeholder="
                        $t('adminProducts.new.information.enterName')
                      "
                      trim
                      required
                    ></b-form-input>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ validated, passed, errors }"
                  vid="form.unit"
                  rules="required"
                  :name="$t('adminProducts.new.information.unit')"
                  class="col"
                  ><b-form-group
                    :label="$t('adminProducts.new.information.unit')"
                    :invalid-feedback="errors[0]"
                    label-for="input-unit"
                  >
                    <b-form-input
                      id="input-unit"
                      v-model="form.unit"
                      type="text"
                      :state="validated ? passed : null"
                      :placeholder="
                        $t('adminProducts.new.information.enterUnit')
                      "
                      trim
                      required
                    ></b-form-input>
                  </b-form-group>
                </ValidationProvider>
              </div>
              <ValidationProvider
                v-slot="{ errors }"
                vid="form.categoryId"
                rules="required"
                :name="$t('adminProducts.new.information.category')"
                ><b-form-group
                  :label="$t('adminProducts.new.information.category')"
                  :invalid-feedback="errors[0]"
                  label-for="input-category-id"
                >
                  <v-select
                    id="input-category-id"
                    v-model="form.categoryId"
                    label="name"
                    :options="searchCategories"
                    :filterable="false"
                    :placeholder="
                      $t('adminProducts.new.information.selectCategory')
                    "
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
                        {{
                          $t('adminProducts.new.information.loadMoreCategory')
                        }}
                      </div>
                    </template>
                    <template #search="{ attributes, events }">
                      <input
                        class="vs__search"
                        :required="!form.categoryId"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </v-select>
                </b-form-group>
              </ValidationProvider>
            </b-collapse>
          </div>
          <div class="form-section">
            <div v-b-toggle.product-management class="section-title">
              <div>
                {{ $t('adminProducts.new.management.title') }}
              </div>
              <IconUp class="section-icon" />
            </div>
            <b-collapse id="product-management" visible>
              <ValidationProvider
                v-slot="{ validated, passed, errors }"
                vid="form.price"
                rules="required|min_value:1"
                :name="$t('adminProducts.new.management.price')"
                ><b-form-group
                  :label="$t('adminProducts.new.management.price')"
                  :invalid-feedback="errors[0]"
                  label-for="input-price"
                >
                  <b-input-group append="VND">
                    <b-form-input
                      id="input-price"
                      v-model="form.price"
                      type="number"
                      min="1"
                      :state="validated ? passed : null"
                      :placeholder="
                        $t('adminProducts.new.management.enterPrice')
                      "
                      number
                      required
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </ValidationProvider>
            </b-collapse>
          </div>
          <div class="form-section">
            <div v-b-toggle.product-detail class="section-title">
              <div>
                {{ $t('adminProducts.new.detail.title') }}
              </div>
              <IconUp class="section-icon" />
            </div>
            <b-collapse id="product-detail" visible>
              <ValidationProvider
                v-slot="{ validated, passed, errors }"
                vid="form.description"
                rules="required|max:1000"
                :name="$t('adminProducts.new.detail.description')"
                ><b-form-group
                  :label="$t('adminProducts.new.detail.description')"
                  :invalid-feedback="errors[0]"
                  label-for="input-description"
                >
                  <b-form-textarea
                    id="input-description"
                    v-model="form.description"
                    rows="3"
                    :state="validated ? passed : null"
                    :placeholder="
                      $t('adminProducts.new.detail.enterDescription')
                    "
                    required
                  ></b-form-textarea>
                </b-form-group>
              </ValidationProvider>
            </b-collapse>
          </div>
          <div class="form-section">
            <div v-b-toggle.product-size class="section-title">
              <div>
                {{ $t('adminProducts.new.size.title') }}
              </div>
              <IconUp class="section-icon" />
            </div>
            <b-collapse id="product-size" visible>
              <div
                v-for="(size, index) in form.sizes"
                :key="index"
                class="form-row align-items-start"
              >
                <ValidationProvider
                  v-slot="{ validated, passed, errors }"
                  vid="size.sizeId"
                  rules="required"
                  :name="$t('adminProducts.new.size.name')"
                  class="col"
                  ><b-form-group
                    :label="$t('adminProducts.new.size.name')"
                    :invalid-feedback="errors[0]"
                    label-for="input-size-id"
                  >
                    <b-form-select
                      id="input-size-id"
                      v-model="size.sizeId"
                      required
                      :state="validated ? passed : null"
                      :options="sizeOptions"
                    >
                      <template #first>
                        <option :value="null" disabled selected hidden>
                          {{ $t('adminProducts.new.size.selectSize') }}
                        </option>
                      </template>
                    </b-form-select>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ validated, passed, errors }"
                  vid="size.quantity"
                  rules="required|min_value:0"
                  :name="$t('adminProducts.new.size.quantity')"
                  class="col"
                  ><b-form-group
                    :label="$t('adminProducts.new.size.quantity')"
                    :invalid-feedback="errors[0]"
                    label-for="input-size-quantity"
                  >
                    <b-form-input
                      id="input-size-quantity"
                      v-model="size.quantity"
                      type="number"
                      min="0"
                      :state="validated ? passed : null"
                      :placeholder="$t('adminProducts.new.size.enterQuantity')"
                      number
                      required
                    ></b-form-input>
                  </b-form-group>
                </ValidationProvider>
                <b-button
                  v-if="form.sizes.length > 1"
                  variant="outline-danger"
                  style="margin-left: 5px; margin-top: 32px"
                  @click="removeSize(index)"
                >
                  <IconTrash />
                </b-button>
              </div>
              <b-button
                block
                variant="outline-primary"
                class="d-flex align-items-center justify-content-center mt-2"
                @click="addMoreSize"
              >
                <IconPlus class="mr-2" />
                {{ $t('adminProducts.new.size.addMoreSize') }}
              </b-button>
            </b-collapse>
          </div>
          <div class="form-section">
            <div v-b-toggle.product-media class="section-title">
              <div>
                {{ $t('adminProducts.new.media.title') }}
              </div>
              <IconUp class="section-icon" />
            </div>
            <b-collapse id="product-media" visible>
              <label class="d-block">{{
                $t('adminProducts.new.media.thumbnails')
              }}</label>
              <div class="d-flex flex-wrap" style="gap: 16px">
                <ValidationProvider
                  v-for="(image, index) in form.images"
                  :key="index"
                  v-slot="{ validated, passed, errors, validate }"
                  vid="image.file"
                  rules="required|mimes:image/*|size:5120"
                  :name="$t('adminProducts.new.media.thumbnails')"
                  ><b-form-group
                    :invalid-feedback="errors[0]"
                    label-for="input-image"
                    class="form-thumbnail position-relative"
                  >
                    <template v-if="image.url">
                      <img
                        :src="image.url"
                        alt="eShopping-thumbnail"
                        class="rounded object-fit-cover upload-image-preview"
                      />
                      <b-button
                        variant="danger"
                        class="position-absolute"
                        style="right: 0; top: 0"
                        @click="removeImage(index)"
                      >
                        <IconTrash />
                      </b-button>
                    </template>
                    <template v-else>
                      <b-form-file
                        id="input-image"
                        v-model="image.file"
                        required
                        :state="validated ? passed : null"
                        accept="image/jpeg, image/png"
                        :placeholder="$t('adminProducts.new.media.uploadImage')"
                        @change="validateImage($event, validate)"
                      >
                      </b-form-file>
                      <b-button
                        v-if="form.images.length > 1"
                        variant="danger"
                        class="position-absolute"
                        style="right: 0; top: 0; z-index: 100"
                        @click="removeImage(index)"
                      >
                        <IconTrash />
                      </b-button>
                    </template>
                  </b-form-group>
                </ValidationProvider>
                <b-button
                  class="upload-image-new"
                  variant="outline-primary"
                  @click="addMoreImage"
                >
                  <IconPlus />
                  {{ $t('adminProducts.new.media.addMoreImage') }}
                </b-button>
              </div>
            </b-collapse>
          </div>
        </div>
      </div>
    </b-form>
  </ValidationObserver>
</template>

<script lang="ts">
import Vue from 'vue';
import { ApiMeta } from '~/types/api';
import { Option } from '~/types/Option';
import { Category } from '~/types/Category';
import { PostProduct } from '~/types/Product';
import { Size } from '~/types/Size';
import IconPlus from '~/components/icons/IconPlus.vue';
import IconTrash from '~/components/icons/IconTrash.vue';
import IconLeft from '~/components/icons/IconLeft.vue';
import IconUp from '~/components/icons/IconUp.vue';

export default Vue.extend({
  name: 'NewProduct',

  components: {
    IconPlus,
    IconTrash,
    IconLeft,
    IconUp,
  },

  layout: 'dashboard',

  middleware: 'auth',

  data() {
    return {
      categoryOptions: [] as Option[],
      sizeOptions: [] as Option[],
      form: {
        name: '',
        description: '',
        price: 0,
        unit: '',
        categoryId: null,
        sizes: [
          {
            sizeId: null,
            quantity: 0,
          },
        ],
        images: [
          {
            file: null as File | null,
            url: '',
          },
        ],
      } as PostProduct,
      observerCategory: null as unknown as IntersectionObserver,
      pageCategory: 1,
      searchCategory: '',
      searchCategories: [] as Category[],
      categoryMeta: {} as ApiMeta,
    };
  },

  computed: {
    hasNextPageCategory(): boolean {
      return this.categoryMeta.currentPage < this.categoryMeta.totalPages;
    },
  },

  watch: {
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
    this.observerCategory = new IntersectionObserver(
      this.infiniteScrollCategory
    );
  },

  created() {
    this.loadSizes();
  },

  methods: {
    changeSearchCategory(search: string) {
      this.searchCategory = search;
    },

    async replaceSearchCategories() {
      this.pageCategory = 1;
      this.searchCategories = await this.loadSearchCategories();
    },

    async pushSearchCategories() {
      const newCategories = await this.loadSearchCategories();
      this.searchCategories.push(...newCategories);
    },

    async loadSearchCategories() {
      const params = {
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

    selectCategory(category: Category) {
      this.form.categoryId = category.id;
    },

    loadSizes() {
      this.$services.sizes
        .index()
        .then(({ data: { items: sizes } }) => {
          this.sizeOptions = sizes.map((size: Size) => ({
            value: size.id,
            text: size.name,
          }));
        })
        .catch(this.showErrorToast);
    },

    showErrorToast() {
      this.$bvToast.toast(this.$t('toastMessage.error') as string, {
        title: this.$t('toastTitle.error') as string,
        variant: 'danger',
      });
    },

    addMoreSize() {
      this.form.sizes.push({
        sizeId: null,
        quantity: 0,
      });
    },

    removeSize(index: number) {
      this.form.sizes.splice(index, 1);
    },

    addMoreImage() {
      this.form.images.push({
        file: null,
        url: '',
      } as any);
    },

    removeImage(index: number) {
      this.form.images.splice(index, 1);
    },

    getImageIndex() {
      return this.form.images.findIndex((image) => image.url === '');
    },

    async validateImage(event: Event, validate: (file: File) => any) {
      const { files } = event.target as HTMLInputElement;
      const file = files?.[0];
      if (!file) {
        return;
      }
      const validatedResult = await validate(file);
      if (validatedResult.valid) {
        this.postImage(file);
      }
    },

    postImage(file: File) {
      const index = this.getImageIndex();
      const payload = new FormData();
      payload.append('image', file);

      this.$axios
        .post('/images/upload', payload)
        .then(({ data: { url } }) => {
          this.form.images[index].url = url;
        })
        .catch(() => {
          this.$bvToast.toast(
            this.$t('adminProducts.new.media.uploadError') as string,
            {
              title: this.$t('toastTitle.error') as string,
              variant: 'danger',
            }
          );
        });
    },

    formattedImagesForm() {
      return {
        ...this.form,
        images: this.form.images.map((image) => image.url),
      };
    },

    postProduct() {
      this.$axios
        .$post('/products', this.formattedImagesForm())
        .then(() => {
          this.$bvToast.toast(this.$t('adminProducts.new.success') as string, {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          });
          this.$router.push(this.localePath({ name: 'admin-products' }));
        })
        .catch(() => {
          this.$bvToast.toast(this.$t('adminProducts.new.error') as string, {
            title: this.$t('toastTitle.error') as string,
            variant: 'danger',
          });
        });
    },
  },
});
</script>
