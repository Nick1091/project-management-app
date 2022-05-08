const minNameLength = 2;
const minPasswordLength = 6;
const maxPasswordLength = 18;
const minLoginLength = 3;
const maxLoginLength = 12;

export const nameValidation = {
  required: 'Input your name',
  validate: (value: string) => {
    if (value.length <= minNameLength) {
      return `input more than ${minNameLength - 1} letters`;
    }
    if (
      value.match(
        /[0-9,\!,\@,\#,\$,\%,\^,\&,\*,\(,\),\_,\+,\=,\|,\,,\.\?,\;,\',\",\:\/\\,\-,\,\},\{,\(,\)]/
      )
    ) {
      return 'name must contain only letters';
    } else {
      return true;
    }
  },
};

export const passwordValidation = {
  required: 'Input password',
  validate: (value: string) => {
    if (value.length < minPasswordLength) {
      return `password must be more than ${minPasswordLength} characters`;
    }
    if (value.length > maxPasswordLength) {
      return `password must be no more than ${maxPasswordLength} characters`;
    }
    return true;
  },
};

export const loginValidation = {
  required: 'Input login',
  validate: (value: string) => {
    if (value.length < minLoginLength) {
      return `login must be more than ${minLoginLength} characters`;
    }
    if (value.length > 12) {
      return `login must be no more than ${maxLoginLength} characters`;
    }
    return true;
  },
};
