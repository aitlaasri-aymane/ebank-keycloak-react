import React, { useState } from "react";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "../util/axios";
import { toast } from "react-hot-toast";

const Deposit = ({
  depositInput,
  setDepositInput,
  activeBankAccount,
  setActiveBankAccount,
}) => {
  const [amount, setAmount] = useState();

  function handleDeposit() {
    const deposit = Axios.post(
      `/BankAccount/${activeBankAccount.accountNumber}/deposit`,
      null,
      { params: { amount: amount } }
    )
      .then((res) => {
        setDepositInput(!depositInput);
        setActiveBankAccount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    toast.promise(
      deposit,
      {
        loading: "Depositing...",
        success: "Deposited " + amount + "!",
        error: "Something went wrong!",
      },
      {
        style: {
          background: "#191D24",
          color: "#A3ABB9",
        },
      }
    );
  }
  return (
    <>
      {depositInput && (
        <div className="w-full">
          <div className="grid grid-cols-4 my-3 justify-center w-full flex-row items-center">
            <label className="mr-2">Amount :</label>
            <input
              type="text"
              placeholder="Amount to deposit"
              className="input w-full max-w-xs col-span-3"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
          <div className="flex w-full justify-center gap-3 mt-3">
            <button
              onClick={() => handleDeposit()}
              className="btn btn-circle btn-success btn-outline"
            >
              <FontAwesomeIcon icon={faCheck} className="text-xl" />
            </button>
            <button
              className="btn btn-circle btn-error btn-outline"
              onClick={() => {
                setDepositInput(!depositInput);
              }}
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Deposit;
