import i18next from 'i18next';
import * as yup from 'yup';

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
    if (value.length > maxLoginLength) {
      return `login must be no more than ${maxLoginLength} characters`;
    }
    return true;
  },
};

export let columnFormSchema = yup.object({
  title: yup
    .string()
    .required('This field is required')
    .max(60, 'Field should be 60 characters maximum'),
});

export let boardFormSchema = yup.object({
  title: yup
    .string()
    .required('This field is required')
    .max(60, 'Field should be 60 characters maximum'),
  description: yup
    .string()
    .required('This field is required')
    .max(120, 'Field should be 120 characters maximum'),
});

export let taskFormSchema = yup.object({
  title: yup
    .string()
    .required('This field is required')
    .max(60, 'Field should be 60 characters maximum'),
  description: yup
    .string()
    .required('This field is required')
    .max(120, 'Field should be 120 characters maximum'),
});

const updateYupSchemas = () => {
  const maxLengthShort = i18next.t(`common:MaximumLengthText60`);
  const maxLengthLong = i18next.t(`common:MaximumLengthText120`);
  const requiredText = i18next.t(`common:RequiredText`);

  columnFormSchema = yup.object({
    title: yup.string().required(requiredText).max(60, maxLengthShort),
  });
  boardFormSchema = yup.object({
    title: yup.string().required(requiredText).max(60, maxLengthShort),
    description: yup.string().required(requiredText).max(120, maxLengthLong),
  });
  taskFormSchema = yup.object({
    title: yup.string().required(requiredText).max(60, maxLengthShort),
    description: yup.string().required(requiredText).max(120, maxLengthLong),
  });
};

if (i18next.isInitialized) {
  updateYupSchemas();
}

i18next.on('languageChanged', function () {
  updateYupSchemas();
});
