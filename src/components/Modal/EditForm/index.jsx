import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectTransactionId } from "../../../redux/modal/selectors"
import {
  selectCategories,
  selectTransactions,
} from "../../../redux/transaction/selectors"
import { editTransaction } from "../../../redux/transaction/operations"
import DatePicker from "react-datepicker"
import { editSchema } from "../../../validations/EditSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, Controller } from "react-hook-form"
import { closeModal } from "../../../redux/modal/slice"
import { fetchBankCurrency } from "../../../redux/bankApi/operations"
import {Calendar} from "lucide-react"
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast"

export default function EditForm() {
  const dispatch = useDispatch()
  const transactionId = useSelector(selectTransactionId)
  const transactionList = useSelector(selectTransactions)
  const categories = useSelector(selectCategories)

  const editField = transactionList.find(
    (transaction) => transaction.id === transactionId
  )
  const category = categories.find(
    (category) => category.id === editField.categoryId
  )

  useEffect(() => {
    dispatch(fetchBankCurrency())
  }, [dispatch])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
    defaultValues: {
      amount: `${Math.abs(editField.amount)}`,
      date: new Date(editField.transactionDate),
      comment: `${editField.comment}`,
    },
  })

  const onSubmit = async(data) => {
    const formattedData = {
      transactionDate: data.date.toISOString(),
      type: editField.type,
      categoryId: editField.categoryId,
      comment: data.comment,
      amount: editField.type === "INCOME" ? data.amount : -data.amount,
    }
    const response = await dispatch(editTransaction({ transactionId, updateTransaction: formattedData }))
    if (response.meta.requestStatus === "fulfilled"){
      dispatch(closeModal());
      toast.success("Transaction updated successfully");
    }
    if (response.meta.requestStatus === "rejected"){
        toast.error("An error occurred. Please try again later.");
    }
    reset()
    dispatch(closeModal())
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4 text-sm">
        <span
          className={
            editField.type === "INCOME"
              ? "text-[#FFB627]"
              : "text-white/60"
          }
        >
          Income
        </span>
        <span className="text-white/60">/</span>
        <span
          className={
            editField.type === "EXPENSE"
              ? "text-[#FF868D]"
              : "text-white/60"
          }
        >
          Expense
        </span>
      </div>

      <div aria-disabled className="w-full cursor-not-allowed bg-white/10 border-b border-white/20 p-2 text-white rounded-t-lg">
        {category.name}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              {...register("amount")}
              placeholder="0.00"
              className="w-full bg-white/10 border-b border-white/20 p-2 text-white rounded-t-lg focus:outline-none focus:border-white/40"
            />
            {errors.amount && (
              <p className="text-red-400 text-sm">{errors.amount.message}</p>
            )}
          </div>

          <div className="relative flex-1">
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <div className="relative">
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="w-full bg-white/10 border-b border-white/20 p-2 text-white rounded-t-lg focus:outline-none focus:border-white/40"
                  />
                  <Calendar className="absolute right-2 top-2.5 text-white/60" size={16} />
                </div>
              )}
            />
            {errors.date && (
              <p className="text-red-400 text-sm">{errors.date.message}</p>
            )}
          </div>
        </div>

        <input
          {...register("comment")}
          placeholder="Comment"
          className="w-full bg-white/10 border-b border-white/20 p-2 text-white rounded-t-lg focus:outline-none focus:border-white/40"
        />
        {errors.comment && (
          <p className="text-red-400 text-sm">{errors.comment.message}</p>
        )}

        <div className="flex flex-col gap-2 pt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-[#FFB627] to-[#FF868D] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            className="w-full py-2 px-4 bg-white text-[#2D1B69] rounded-lg hover:bg-white/90 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}