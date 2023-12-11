// TransactionsList.js
import React, { useEffect, useState } from "react";
import Transaction from "./Transaction";

function TransactionsList() {
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((resp) => resp.json())
      .then((data) => setUserTransactions(data))
      .catch((error) => console.error("Encountered an error while fetching data ", error))
  }, [])

  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
        </tr>
        {/* Fix: Add a return statement */}
        {userTransactions.map((userTransaction) => (
          <Transaction key={userTransaction.id} userTransaction={userTransaction} />
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;
