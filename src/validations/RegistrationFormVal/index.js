import * as yup from "yup";

export const registerSchema = yup
  .object({
    username: yup
      .string()
      .min(6, "Kullanıcı adı en az 6 karakter olmalıdır")
      .max(30, "Kullanıcı adı en fazla 30 karakter olmalıdır")
      .required("Kullanıcı adı alanı zorunludur"),
    email: yup
      .string()
      .email("Geçerli bir email adresi giriniz")
      .required("Email alanı zorunludur"),
    password: yup
      .string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .max(30, "Şifre en fazla 30 karakter olmalıdır")
      .required("Şifre alanı zorunludur"),
    retryPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Şifreler eşleşmelidir')
      .required("Şifre tekrarı zorunludur"),
  })
  .required();