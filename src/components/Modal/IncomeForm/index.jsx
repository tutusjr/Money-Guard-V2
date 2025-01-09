import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { incomeSchema } from "../../../validations/IncomeFormVal";
import DatePicker from "react-datepicker";
import { addTransaction } from "../../../redux/transaction/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../../redux/transaction/selectors";
import { closeModal } from "../../../redux/modal/slice";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";


export default function IncomeForm() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const incomeCategories = categories.filter(
    (category) => category.type === "INCOME" && category.id
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(incomeSchema),
    defaultValues: {
      amount: "",
      date: new Date(),
      comment: "",
    },
  });

  const onSubmit = async(data) => {
    const formattedData = {
      transactionDate: data.date.toISOString(),
      type: "INCOME",
      categoryId: incomeCategories.map(
        (incomeCategorie) => incomeCategorie.id
      )[0],
      comment: data.comment,
      amount: data.amount,
    };
    const response = await dispatch(addTransaction(formattedData));
    if (response.meta.requestStatus === "fulfilled"){
      dispatch(closeModal());
      toast.success("Income added successfully");
    }
    if (response.meta.requestStatus === "rejected"){
        toast.error("An error occurred. Please try again later.");
    }
    reset();
  };

  return (
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
          Add
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
  );
}
