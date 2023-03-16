import React from "react";
import {
  faMoneyBillTransfer,
  faHandHoldingDollar,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Operations = ({
  setRibInput,
  setDepositInput,
  setWithdrawInput,
  withdrawInput,
  ribInput,
  depositInput,
}) => {
  return (
    <>
      <button
        className={`btn ${withdrawInput ? "btn-ghost" : "btn-secondary"}`}
        onClick={() => {
          setRibInput(false);
          setDepositInput(false);
          setWithdrawInput(!withdrawInput);
        }}
      >
        Withdraw <FontAwesomeIcon icon={faHandHoldingDollar} className="ml-2" />
      </button>
      <button
        className={`btn ${ribInput ? "btn-ghost" : "btn-secondary"}`}
        onClick={() => {
          setRibInput(!ribInput);
          setDepositInput(false);
          setWithdrawInput(false);
        }}
      >
        Transfer <FontAwesomeIcon icon={faMoneyBillTransfer} className="ml-2" />
      </button>
      <button
        className={`btn ${depositInput ? "btn-ghost" : "btn-secondary"}`}
        onClick={() => {
          setDepositInput(!depositInput);
          setRibInput(false);
          setWithdrawInput(false);
        }}
      >
        Deposit <FontAwesomeIcon icon={faPiggyBank} className="ml-2" />
      </button>
    </>
  );
};

export default Operations;
