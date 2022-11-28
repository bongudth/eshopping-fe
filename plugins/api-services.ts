/* eslint-disable no-shadow */
/* eslint-disable prefer-promise-reject-errors */
import { Context, Inject } from '@nuxt/types/app';
import { AxiosError } from 'axios';
import { initApiServices, ServiceFactory } from '~/services';
import { ApiResponseError } from '~/types/api';

declare module 'vue/types/vue' {
  interface Vue {
    readonly $services: ServiceFactory;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    readonly $services: ServiceFactory;
  }

  interface Context {
    readonly $services: ServiceFactory;
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line
  interface Store<S> {
    readonly $services: ServiceFactory;
  }
}

export default (context: Context, inject: Inject) => {
  context.$axios.onError((error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      if (status >= 500) {
        // Show error page for 5XX status codes
        context.error({ ...error, message: error.toString() });
        return Promise.resolve(false);
      }

      if (status === 403) {
        // Show 403 error page
        context.error({ statusCode: 403, message: ' ' });
        return Promise.resolve(false);
      }

      // Component will handle this error
      return Promise.reject(error.response.data as ApiResponseError);
    }

    if (error.request) {
      // Show error page with the messsage form the request
      context.error({ statusCode: 1000, message: error.message });
      return Promise.reject({ statusCode: 1000, message: error.message });
    }

    context.error({ statusCode: undefined, message: error.message });
    return Promise.reject({ statusCode: undefined, message: error.message });
  });

  inject('services', initApiServices(context.$axios, context.app));
};
