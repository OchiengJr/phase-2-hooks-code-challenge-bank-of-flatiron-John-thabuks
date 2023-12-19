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
        const data = await response.json();
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, []);

  const updateTransactions = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    setFilteredTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  const handleSearch = (term) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleDelete = async (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
    setFilteredTransactions(updatedTransactions);

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      console.log("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
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
      <AddTransactionForm transactions={transactions} addTransaction={updateTransactions} />
      <TransactionsList transactions={filteredTransactions} onDelete={handleDelete} onSort={handleSort} />
    </div>
  );
}

export default AccountContainer;
