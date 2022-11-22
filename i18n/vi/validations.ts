import vi from 'vee-validate/dist/locale/vi.json';

export default {
  code: 'vi',
  messages: {
    ...vi.messages,
    // Override the default messages for the vi locale below.
    confirmed: '{_field_} không khớp với {target}',
  },
};
