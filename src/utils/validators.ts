const usaPhone = {
  validator(_: any, value: string = '') {
    if (!value.length) return Promise.resolve();

    if (!value.match(/[0-9]/)) return Promise.reject(new Error('Only numbers'));
    if (value.length !== 10) return Promise.reject(new Error('Phone must be 10 digits'));

    return Promise.resolve();
  },
};

const validator = {
  usaPhone,
  require: {
    required: true,
    message: 'Required',
  },

  requireUsername: {
    required: true,
    message: 'Please input your username!',
  },

  currency: {
    pattern: /^(\.?)\d+(\.\d{1,6})?$/,
    message: 'Invalid money format',
  },
  numbers: {
    pattern: /^[0-9]$/,
    message: 'Only numbers',
  },
  integers: {
    pattern: /^\d+$/,
    message: 'Only numbers',
  },
  minlength2: {
    min: 2,
    message: 'Min 2 characters',
  },
  length4: {
    len: 4,
    message: 'Must be 4 characters',
  },
  maxlength6: {
    max: 6,
    message: 'Max 6 characters',
  },
  minlength5: {
    min: 5,
    message: 'Min 5 characters',
  },
  maxlength10: {
    max: 10,
    message: 'Max 10 characters',
  },
  maxlength15: {
    max: 15,
    message: 'Max 15 characters',
  },
  maxlength20: {
    max: 20,
    message: 'Max 20 characters',
  },
  maxlength30: {
    max: 30,
    message: 'Max 30 characters',
  },
  name: {
    pattern: /^[ a-zA-Z0-9._-]+$/,
    message: 'Special characters are not allowed',
  },
  url: {
    type: 'url',
    message: 'This field must be a valid url.',
  },
};

export default validator;
