/* eslint-disable no-empty-function, no-useless-constructor */
import { NuxtAppOptions } from '@nuxt/types/app';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import {
  ApiRequestParams,
  ApiResponseData,
  ApiResponseError,
  ApiResponseList,
} from '~/types/api';

export default class RestService<T> {
  constructor(
    protected $axios: NuxtAxiosInstance,
    protected resource: string,
    protected $app?: NuxtAppOptions
  ) {}

  index(params?: Partial<ApiRequestParams>): Promise<ApiResponseList<T>> {
    return this.$axios.$get(`/${this.resource}`, { params });
  }

  show(
    id: string,
    params: Partial<ApiRequestParams> = {}
  ): Promise<ApiResponseData<T>> {
    return this.$axios.$get(`/${this.resource}/${id}`, { params });
  }

  create(
    payload: Record<string, Partial<T>> | FormData | Partial<T>,
    { visibleFields = [] }: { visibleFields?: string[] } = {}
  ): Promise<ApiResponseData<T>> {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`/${this.resource}`, payload)
        .then(resolve)
        .catch((error) => reject(this.buildFormErrors(error, visibleFields)));
    });
  }

  update(
    id: string,
    payload: Partial<T> | FormData,
    { visibleFields = [] }: { visibleFields?: string[] } = {}
  ): Promise<ApiResponseData<T>> {
    return new Promise((resolve, reject) => {
      this.$axios
        .$put(`/${this.resource}/${id}`, payload)
        .then(resolve)
        .catch((error) => reject(this.buildFormErrors(error, visibleFields)));
    });
  }

  destroy(id: string | number): Promise<void> {
    return this.$axios.$delete(`/${this.resource}/${id}`);
  }

  protected buildFormErrors(
    error: ApiResponseError,
    visibleFields: string[] = []
  ) {
    if (this.$app) {
      const formErrors = visibleFields.reduce((e, field) => {
        const errorItem = error.errors.find((item) => item.field === field);
        if (errorItem) {
          e[field] = errorItem.message;
        }
        return e;
      }, {} as Record<string, string>);
      const hasFormErrors = Object.keys(formErrors).length > 0;
      if (hasFormErrors) {
        // eslint-disable-next-line no-param-reassign
        error.formErrors = formErrors;
      } else {
        const message = error.message || this.$app.i18n.t(error.message);
        this.$app.$toast.error(String(message), { duration: 5000 });
      }
    }

    return error;
  }
}
