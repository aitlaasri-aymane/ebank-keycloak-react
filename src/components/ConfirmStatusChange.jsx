import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";
import Axios from "../util/axios";
import { toast } from "react-hot-toast";

function ConfirmStatusChange({
  activeBankAccount,
  setActiveBankAccount,
  open,
  handleModalOpen,
}) {
  const modalClass = cn({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": open,
  });

  async function handleStatusChange() {
    const ChangeStatus = Axios.put(
      `/BankAccount/${activeBankAccount.accountNumber}/${
        activeBankAccount.accountStatus === "ACTIVE" ? "suspend" : "activate"
      }`
    )
      .then((res) => {
        setActiveBankAccount(res.data);
        handleModalOpen();
      })
      .catch((err) => {
        handleModalOpen();
        console.log(err);
      });
    toast.promise(
      ChangeStatus,
      {
        loading: "Chaning status...",
        success: "Status changed!",
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
    <div className={modalClass}>
      <div className="modal-box">
        <FontAwesomeIcon icon={faCircleExclamation} className="text-5xl mb-3" />
        <h3 className="font-bold text-lg">
          Are you sure you want to change the status from{" "}
          {activeBankAccount?.accountStatus === "ACTIVE"
            ? "active"
            : "suspended"}{" "}
          to{" "}
          {activeBankAccount?.accountStatus === "ACTIVE"
            ? "suspended"
            : "active"}
          ?
        </h3>

        <div className="modal-action">
          <button onClick={() => handleStatusChange()} className="btn">
            Yes!
          </button>
          <button onClick={() => handleModalOpen()} className="btn">
            No!
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmStatusChange;
