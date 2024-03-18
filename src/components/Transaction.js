import React from "react";
import PropTypes from "prop-types";

function Transaction({ date, description, category, amount, children }) {
  // Format amount as currency with 2 decimal places
  const formattedAmount = Number(amount).toFixed(2);

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{formattedAmount}</td>
      <td>{children}</td>
    </tr>
  );
}

Transaction.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default Transaction;
