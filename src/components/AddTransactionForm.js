import React, { useState } from "react";

const initialFormData = {
  date: "",
  description: "",
  category: "",
  amount: 0,
};

function AddTransactionForm({ addTransaction }) {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      date: formData.date,
      description: formData.description,
      category: formData.category,
      amount: parseFloat(formData.amount),
    };

    addTransaction(newTransaction);

    try {
      const response = await fetch("http://localhost:8001/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      const data = await response.json();
      console.log("Transaction posted successfully:", data);
    } catch (error) {
      console.error("Error posting transaction:", error);
    }

    setFormData(initialFormData);
  };

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
