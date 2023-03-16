import React from "react";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Withdraw = ({ withdrawInput, setWithdrawInput }) => {
  return (
    <>
      {withdrawInput && (
        <form action="" className="w-full">
          <div className="grid grid-cols-4 my-3 justify-center w-full flex-row items-center">
            <label className="mr-2">Amount :</label>
            <input
              type="text"
              placeholder="Amount to withdraw"
              className="input w-full max-w-xs col-span-3"
            />
          </div>
          <div className="flex w-full justify-center gap-3 mt-3">
            <button
              className="btn btn-circle btn-success btn-outline"
              type="submit"
            >
              <FontAwesomeIcon icon={faCheck} className="text-xl" />
            </button>
            <button
              className="btn btn-circle btn-error btn-outline"
              onClick={() => {
                setWithdrawInput(!withdrawInput);
              }}
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Withdraw;
