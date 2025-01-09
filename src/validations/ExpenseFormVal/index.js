import * as yup from "yup";

export const expenseSchema = yup
  .object({
    amount: yup
      .number("Sayı Gir")
      .required("Tutar alanı zorunlu"),
    date: yup
      .date()
      .typeError("Geçerli bir tarih seçmelisiniz")
      .required("Tarih zorunlu"),
    categoryId: yup
      .string()
      .required("Kategori seçimi zorunlu"),
    comment: yup
      .string()
      .required("Yorum alanı zorunlu"),
  })
  .required();
