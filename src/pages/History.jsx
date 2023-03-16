import React, { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { faArrowLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "../util/axios";

const History = () => {
  const [title, setTitle] = useOutletContext();
  const [transactions, setTransactions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    Axios.get("/BankAccount/" + id)
      .then(function (response) {
        setTransactions(response.data.transactions);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    setTitle("History");
  }, []);

  return (
    <>
      <div className="z-[1] w-full mb-4">
        <Link to={"/" + id}>
          <button className="btn">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Home{" "}
            <FontAwesomeIcon icon={faHouse} className="ml-2" />
          </button>
        </Link>
      </div>
      {transactions.length > 0 ? (
        <>
          <table className="table table-zebra w-[75rem] drop-shadow-2xl">
            {/* head */}
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Giver</th>
                <th>Receiver</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(
                (transaction, index) => (
                  console.log(transaction),
                  (
                    <tr key={index} className="hover">
                      <td>
                        {new Date(
                          Date.parse(transaction.transactionDate)
                        ).toLocaleString("fr-FR", {
                          timeZone: "UTC",
                        })}
                      </td>
                      <td
                        className={`${
                          transaction.transactionType === "DEPOSIT"
                            ? "text-green-500"
                            : ""
                        }
                  ${
                    transaction.transactionType === "TRANSFER"
                      ? "text-yellow-500"
                      : ""
                  }
                  ${
                    transaction.transactionType === "WITHDRAW"
                      ? "text-red-500"
                      : ""
                  }
                `}
                      >
                        {transaction.transactionType}
                      </td>
                      <td
                        className={`${
                          transaction.transactionType === "DEPOSIT"
                            ? "text-green-500"
                            : ""
                        }
                  ${
                    transaction.bankAccountGiver
                      ? transaction.bankAccountGiver === id
                        ? "text-red-500"
                        : "text-green-500"
                      : ""
                  }
                  ${
                    transaction.transactionType === "WITHDRAW"
                      ? "text-red-500"
                      : ""
                  }
                `}
                      >
                        {(transaction.transactionType === "DEPOSIT"
                          ? "+"
                          : transaction.bankAccountGiver
                          ? transaction.bankAccountGiver === id
                            ? "-"
                            : "+"
                          : "-") + transaction.amount}
                      </td>
                      <td>{transaction.bankAccountGiver ?? "-"}</td>
                      <td>{transaction.bankAccountReceiver ?? "-"}</td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>

          <div className="btn-group mt-4">
            <button className="btn btn-primary">«</button>
            <button className="dropdown">
              <label tabIndex={0} className="btn btn-primary !rounded-none">
                Page 1
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </button>
            <button className="btn btn-primary">»</button>
          </div>
        </>
      ) : (
        <div className="card w-96 bg-base-100 shadow-xl text-center">
          <div className="card-body text-center">
            <h2 className="card-title flex justify-center">
              No Transactions to show!
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default History;
