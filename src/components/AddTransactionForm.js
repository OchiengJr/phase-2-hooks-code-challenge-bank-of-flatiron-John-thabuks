import React, { useState } from "react";

const initialFormData = {
  date: "",
  description: "",
  category: "",
  amount: 0,
};

function AddTransactionForm({ addTransaction }) {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.description || !formData.category || !formData.amount) {
      setError("All fields are required.");
      return;
    }

    const newTransaction = {
      date: formData.date,
      description: formData.description,
      category: formData.category,
      amount: parseFloat(formData.amount),
    };

    try {
      const response = await fetch("http://localhost:8001/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error("Failed to add transaction.");
      }

      const data = await response.json();
      console.log("Transaction posted successfully:", data);
      addTransaction(newTransaction);
      setError(null);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error posting transaction:", error);
      setError("An error occurred while adding the transaction. Please try again later.");
    }
  };

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <label>Category:</label>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleInputChange}
          />
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </div>
        {error && <div className="ui red message">{error}</div>}
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
