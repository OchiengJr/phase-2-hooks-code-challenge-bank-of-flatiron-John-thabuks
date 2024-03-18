import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import AddTransactionForm from "./AddTransactionForm";
import Search from "./Search";

const API_URL = "http://localhost:8001/transactions";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (term) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
      const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
      setTransactions(updatedTransactions);
      setFilteredTransactions(updatedTransactions);
      console.log("Transaction deleted successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSort = (key, order) => {
    const sorted = [...filteredTransactions].sort((a, b) => {
      const valueA = a[key].toLowerCase();
      const valueB = b[key].toLowerCase();
      return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
    setFilteredTransactions(sorted);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <AddTransactionForm transactions={transactions} setTransactions={setTransactions} />
      <TransactionsList transactions={filteredTransactions} onDelete={handleDelete} onSort={handleSort} />
    </div>
  );
}

export default AccountContainer;
