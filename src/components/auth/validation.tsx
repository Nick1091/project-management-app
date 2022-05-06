export const nameValidation = {
  required: 'Input your name',
  validate: (value: string) => {
    if (value.length <= 2) {
      return 'input more than 2 letters';
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
    if (value.length < 6) {
      return 'password must be more than 6 characters';
    }
    if (value.length > 18) {
      return 'password must be no more than 18 characters';
    }
    return true;
  },
};
export const loginValidation = {
  required: 'Input login',
  validate: (value: string) => {
    if (value.length < 3) {
      return 'login must be more than 3 characters';
    }
    if (value.length > 12) {
      return 'login must be no more than 12 characters';
    }
    return true;
  },
};
