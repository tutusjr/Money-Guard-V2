import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Geçerli bir email adresi giriniz")
      .required("Email alanı zorunludur"),
    password: yup
      .string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .max(30, "Şifre en fazla 30 karakter olmalıdır")
      .required("Şifre alanı zorunludur"),
  })
  .required();
