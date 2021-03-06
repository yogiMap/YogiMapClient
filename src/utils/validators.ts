const usaPhone = {
  validator(_: any, value: string = '') {
    if (!value.length) return Promise.resolve();

    if (!value.match(/^[0-9]*$/)) return Promise.reject(new Error('Only numbers'));
    if (value.length !== 10) return Promise.reject(new Error('Phone must be 10 digits'));

    return Promise.resolve();
  },
};

// 1. (?!.*[\s]) no spaces
// 2. (?=.*\d) digits
// 3. (?=.*[a-z]) lower case
// 3. (?=.*[A-Z]) upper case
// min 7, max 20
const password = {
  validator(_: any, value: string = '') {
    if (!value.length) return Promise.resolve();

    if (value.match(/[ ]/)) return Promise.reject(new Error('No spaces'));
    if (!value.match(/[0-9]/)) return Promise.reject(new Error('Must contain digit'));
    if (!value.match(/[a-z]/)) return Promise.reject(new Error('Must contain lower case'));
    if (!value.match(/[A-Z]/)) return Promise.reject(new Error('Must contain upper case'));
    if (value.length < 7) return Promise.reject(new Error('Length should be min 7 characters'));
    if (value.length > 20) return Promise.reject(new Error('Length should be max 20 characters'));

    return Promise.resolve();
  },
};

// [a-zA-Z0-9] only digits and letters
const zipCode = {
  validator(_: any, value: string = '') {
    if (!value.length) return Promise.resolve();
    if (!value.match(/^[a-zA-Z0-9]+$/)) return Promise.reject(new Error('Must contain only digits and letters'));
    if (value.length > 6) return Promise.reject(new Error('Max 6 characters'));

    return Promise.resolve();
  },
};

const validator = {
  usaPhone,
  password,
  zipCode,
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
  email: {
    pattern: /^\S+@\S+\.\S+$/,
    message: 'Email is not a valid email.',
  },
  minletters2: {
    pattern: /(?=(?:.*[a-zA-Z]){2})/,
    message: 'May contain at least 2 letters',
  },
  minletters3: {
    pattern: /(?=(?:.*[a-zA-Z]){3})/,
    message: 'May contain at least 3 letters',
  },
};

export default validator;
