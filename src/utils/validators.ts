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
  numbers: {
    pattern: /^[0-9]$/,
    message: 'Only numbers',
  },
  length4: {
    len: 4,
    message: 'Must be 4 characters',
  },
  maxlength6: {
    max: 6,
    message: 'Max 6 characters',
  },
  maxlength10: {
    max: 10,
    message: 'Max 10 characters',
  },
  maxlength15: {
    max: 15,
    message: 'Max 15 characters',
  },
  name: {
    pattern: /^[a-zA-Z]+$/,
    message: 'Numbers and special characters are not allowed',
  },
};

export default validator;

