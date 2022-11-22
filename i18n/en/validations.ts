import en from 'vee-validate/dist/locale/en.json';

export default {
  code: 'en',
  messages: {
    ...en.messages,
    // Override the default messages for the en locale below.
    required: "{_field_} can't be empty",
  },
};
