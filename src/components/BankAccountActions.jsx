import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faRepeat,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ConfirmStatusChange from "./ConfirmStatusChange";

function BankAccountActions({
  operations,
  setOperations,
  activeBankAccount,
  setActiveBankAccount,
}) {
  const [openModal, setOpenModal] = useState(false);

  function handleModal() {
    if (activeBankAccount) setOpenModal(!openModal);
  }
  const DoOperationsCondition =
    activeBankAccount && activeBankAccount?.accountStatus === "ACTIVE";
  return (
    <div className="card-actions justify-center">
      <Link
        to={
          activeBankAccount
            ? `/history/${activeBankAccount.accountNumber}`
            : "#"
        }
        className={activeBankAccount ? "" : "cursor-not-allowed"}
      >
        <button
          className={activeBankAccount ? "btn btn-primary" : "btn btn-disabled"}
        >
          History <FontAwesomeIcon icon={faClockRotateLeft} className="ml-2" />
        </button>
      </Link>
      <a
        className={
          (activeBankAccount ?? "cursor-not-allowed") +
          (activeBankAccount?.accountStatus === "SUSPENDED" &&
            " cursor-not-allowed")
        }
      >
        <button
          className={`btn ${operations ? "btn-ghost" : "btn-primary"} ${
            activeBankAccount ?? "btn-disabled"
          } ${
            activeBankAccount?.accountStatus === "SUSPENDED" &&
            " btn-disabled cursor-not-allowed"
          }`}
          onClick={() => {
            setOperations(!operations);
          }}
        >
          Operations <FontAwesomeIcon icon={faRightLeft} className="ml-2" />
        </button>
      </a>
      <a className={activeBankAccount ?? "cursor-not-allowed"}>
        <button
          className={activeBankAccount ? "btn btn-primary" : "btn btn-disabled"}
          onClick={() => handleModal()}
        >
          Status <FontAwesomeIcon icon={faRepeat} className="ml-2" />
        </button>
      </a>
      <ConfirmStatusChange
        open={openModal}
        activeBankAccount={activeBankAccount}
        handleModalOpen={handleModal}
        setActiveBankAccount={setActiveBankAccount}
      />
    </div>
  );
}

export default BankAccountActions;
