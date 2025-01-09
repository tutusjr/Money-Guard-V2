import * as yup from "yup";

export const editSchema = yup
  .object({
    amount: yup
      .number("Sayı Gir")
      .required("Tutar alanı zorunlu"),
    date: yup
      .date()
      .typeError("Geçerli bir tarih seçmelisiniz")
      .required("Tarih zorunlu"),
    comment: yup
      .string()
      .required("Yorum alanı zorunlu"),
  })
  .required();
