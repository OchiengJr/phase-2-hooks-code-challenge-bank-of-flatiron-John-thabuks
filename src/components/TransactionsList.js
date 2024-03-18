import React, { useState } from "react";
import PropTypes from "prop-types";
import Transaction from "./Transaction";

function TransactionsList({ transactions, onDelete, onSort }) {
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (key) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onSort(key, newOrder);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header" onClick={() => handleSort("date")}>
              Date
            </h3>
          </th>
          <th>
            <h3 className="ui center aligned header" onClick={() => handleSort("description")}>
              Description
            </h3>
          </th>
          <th>
            <h3 className="ui center aligned header" onClick={() => handleSort("category")}>
              Category
            </h3>
          </th>
          <th>
            <h3 className="ui center aligned header" onClick={() => handleSort("amount")}>
              Amount
            </h3>
          </th>
        </tr>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              date={transaction.date}
              description={transaction.description}
              category={transaction.category}
              amount={transaction.amount}
            >
              <button onClick={() => handleDelete(transaction.id)}>Delete</button>
            </Transaction>
          ))
        ) : (
          <tr>
            <td colSpan="4">No transactions available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

TransactionsList.propTypes = {
  transactions: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TransactionsList;
