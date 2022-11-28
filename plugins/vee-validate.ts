import Vue from 'vue';
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend,
} from 'vee-validate';
import {
  required,
  email,
  regex,
  confirmed,
  max,
  min,
  min_value,
  max_value,
  length,
  numeric,
  mimes,
  size,
} from 'vee-validate/dist/rules';
import { Context } from '@nuxt/types';

import en from '~/i18n/en/validations';
import vi from '~/i18n/vi/validations';

extend('required', required);
extend('email', email);
extend('regex', regex);
extend('confirmed', confirmed);
extend('max', max);
extend('min', min);
extend('min_value', min_value);
extend('max_value', max_value);
extend('length', length);
extend('numeric', numeric);
extend('mimes', mimes);
extend('size', size);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

localize({
  en,
  vi,
});

export default (context: Context) => {
  localize(context.app.i18n.locale);
};
