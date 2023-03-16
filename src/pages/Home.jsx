import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import BankAccountActions from "../components/BankAccountActions";
import BankAccountDetails from "../components/BankAccountDetails";
import ConfirmStatusChange from "../components/ConfirmStatusChange";
import Deposit from "../components/Deposit";
import Operations from "../components/Operations";
import Transfer from "../components/Transfer";
import Withdraw from "../components/Withdraw";
import Axios from "../util/axios";

const Home = () => {
  const [operations, setOperations] = useState(false);
  const [ribInput, setRibInput] = useState(false);
  const [depositInput, setDepositInput] = useState(false);
  const [withdrawInput, setWithdrawInput] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [accountHolder, setAccountHolder] = useState(null);
  const [activeBankAccount, setActiveBankAccount] = useState(null);
  const [title, setTitle] = useOutletContext();
  const { keycloak } = useKeycloak();
  const { id } = useParams();

  const username = keycloak.tokenParsed.preferred_username + "";

  Axios.defaults.headers.common["Authorization"] = `Bearer ${keycloak.token}`;

  useEffect(() => {
    Axios.get("/AccountHolder")
      .then(function (response) {
        setAccountHolder(response.data.id);
        setBankAccounts(response.data.bankAccounts);
        setActiveBankAccount(
          response.data.bankAccounts.find((b) => b.accountNumber === id)
        );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    setTitle(
      `Hello, ${
        username.charAt(0).toUpperCase() + username.toLowerCase().slice(1)
      }`
    );
  }, []);

  return (
    <div className="card w-[30rem] h-fit bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <BankAccountDetails
          bankAccounts={bankAccounts}
          activeBankAccount={activeBankAccount}
          setActiveBankAccount={setActiveBankAccount}
          accountHolder={accountHolder}
          setBankAccounts={setBankAccounts}
        />
        <div className="card-actions justify-center">
          <BankAccountActions
            operations={operations}
            setOperations={setOperations}
            activeBankAccount={activeBankAccount}
            setActiveBankAccount={setActiveBankAccount}
          />
          <ConfirmStatusChange />
          {operations && (
            <div className="card-actions w-full flex flex-row">
              <Operations
                withdrawInput={withdrawInput}
                ribInput={ribInput}
                depositInput={depositInput}
                setDepositInput={setDepositInput}
                setRibInput={setRibInput}
                setWithdrawInput={setWithdrawInput}
              />
              <Transfer ribInput={ribInput} setRibInput={setRibInput} />
              <Withdraw
                withdrawInput={withdrawInput}
                setWithdrawInput={setWithdrawInput}
              />
              <Deposit
                depositInput={depositInput}
                setDepositInput={setDepositInput}
                activeBankAccount={activeBankAccount}
                setActiveBankAccount={setActiveBankAccount}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
