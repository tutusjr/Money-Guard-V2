"use client";

import React from "react";
import Switcher from "./Switcher";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddMode, closeModal } from "../../redux/modal/slice";
import { selectModalMode, selectAddMode } from "../../redux/modal/selectors";
import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";
import EditForm from "./EditForm";
import { X } from "lucide-react";

export default function Modal() {
  const dispatch = useDispatch();
  const addMode = useSelector(selectAddMode);
  const modalMode = useSelector(selectModalMode);

  const handleClickOutside = (e) => {
    if (e.target.id === "modal-overlay") {
      dispatch(closeModal());
    }
  };

  return (
    <div
      onClick={handleClickOutside}
      id="modal-overlay"
      className="fixed z-[500] inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="w-[400px] bg-[#2D1B69]/95 rounded-xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div className="w-[20px]"></div>
          <h1 className="text-2xl text-center font-semibold text-white">
            {modalMode === "add" ? "Add transaction" : "Edit transaction"}
          </h1>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {modalMode === "add" ? (
          <>
            <div className="flex justify-center items-center gap-4 mb-6">
              <p
                className={`text-sm ${
                  addMode === false ? "text-[#FFB627]" : "text-white/60"
                }`}
              >
                Income
              </p>
              <Switcher onClick={() => dispatch(toggleAddMode())} />
              <p
                className={`text-sm ${
                  addMode === true ? "text-[#FF868D]" : "text-white/60"
                }`}
              >
                Expense
              </p>
            </div>
            {addMode ? <ExpenseForm /> : <IncomeForm />}
          </>
        ) : (
          <EditForm />
        )}
      </div>
    </div>
  );
}
