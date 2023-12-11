import React from "react";

function Transaction({ userTransaction }) {
  return (
    <tr>
      <td>{userTransaction.date}</td>
      <td>{userTransaction.description}</td>
      <td>{userTransaction.category}</td>
      <td>{userTransaction.amount}</td>
    </tr>
  );
}

export default Transaction;
