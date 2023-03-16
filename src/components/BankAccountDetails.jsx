import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faBuildingColumns,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "../util/axios";
import { toast } from "react-hot-toast";

const BankAccountDetails = ({
  bankAccounts,
  setActiveBankAccount,
  activeBankAccount,
  accountHolder,
  setBankAccounts,
}) => {
  const navigate = useNavigate();

  function handleBankAccountChange(bankaccount) {
    setActiveBankAccount(bankaccount);
    navigate(`/${bankaccount.accountNumber}`);
  }
  function NewBankAccount() {
    const CreateBankAcc = Axios.post("/BankAccount", {
      accountStatus: "ACTIVE",
      accountBalance: 0,
      accountHolderId: accountHolder,
    })
      .then((res) => {
        setBankAccounts([...bankAccounts, res.data]);
        setActiveBankAccount(res.data);
        navigate(`/${res.data.accountNumber}`);
      })
      .catch((err) => {
        console.log(err);
      });
    toast.promise(
      CreateBankAcc,
      {
        loading: "Creating Bank Account...",
        success: "Bank Account created!",
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
      <div
        className={
          activeBankAccount?.accountStatus == "ACTIVE"
            ? "avatar online"
            : "avatar offline"
        }
      >
        <FontAwesomeIcon className="text-6xl" icon={faBuildingColumns} />
      </div>
      <div className="group dropdown">
        <label tabIndex={0} className="capitalize btn m-1 card-title">
          Current Bank Account <FontAwesomeIcon icon={faCaretDown} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box h-60 pt-0 relative overflow-auto flex-nowrap"
        >
          <li className="sticky border-b-2 pb-1 rounded-none pt-2 bg-base-100 border-base-200 top-0 z-10">
            <button className="btn" onClick={() => NewBankAccount()}>
              New Bannk Account
            </button>
          </li>
          {bankAccounts?.map((bankaccount) => (
            <li key={bankaccount.accountNumber}>
              <a
                className={bankaccount === activeBankAccount ? "active" : ""}
                onClick={() => handleBankAccountChange(bankaccount)}
              >
                {bankaccount.accountNumber}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-neutral-500">Balance</p>
      <h1 className="text-4xl font-bold normal-nums mb-4">
        {activeBankAccount
          ? activeBankAccount.accountBalance.toLocaleString("fr-FR", {
              style: "currency",
              currency: "MAD",
            })
          : ""}
      </h1>
    </>
  );
};

export default BankAccountDetails;
