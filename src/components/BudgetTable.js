import React, { useState } from "react";
import CategoryTable from "./CategoryTable";
import Modal from "./CategoryModal";
import './BudgetTable.css';

const BudgetTable = () => {
  const [categoryIncome, setCategoryIncome] = useState([
    {
      mainCategory: 'General Income',
      subCategory: [
        { sCategory: 'Sale', amounts: Array(12).fill(0) },
        { sCategory: 'Commission', amounts: Array(12).fill(0) }
      ]
    },
    {
      mainCategory: 'Other Income',
      subCategory: [
        { sCategory: 'Training', amounts: Array(12).fill(0) },
        { sCategory: 'Consulting', amounts: Array(12).fill(0) }
      ]
    }
  ]);

  const [categoryExpenses, setCategoryExpenses] = useState([
    {
      mainCategory: 'Operational Expenses',
      subCategory: [
        { sCategory: 'Management Fees', amounts: Array(12).fill(0) },
        { sCategory: 'Cloud Hosting', amounts: Array(12).fill(0) }
      ]
    },
    {
      mainCategory: 'Salaries & Wages',
      subCategory: [
        { sCategory: 'Full Time Dev Salaries', amounts: Array(12).fill(0) },
        { sCategory: 'Part Time Dev Salaries', amounts: Array(12).fill(0) },
        { sCategory: 'Remote Salaries', amounts: Array(12).fill(0) }
      ]
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [startMonth, setStartMonth] = useState(0);
  const [endMonth, setEndMonth] = useState(11);

  const openModal = (type, index = null) => {
    setModalType(type);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewCategoryName("");
    setNewSubCategoryName("");
  };

  const addNewCategory = (setCategoryFunction) => {
    setCategoryFunction(prevCategories => [
      ...prevCategories,
      { mainCategory: newCategoryName, subCategory: [] }
    ]);
    closeModal();
  };

  const addNewSubCategory = (index, setCategoryFunction) => {
    setCategoryFunction(prevCategories => {
      const updatedCategories = [...prevCategories];
      updatedCategories[index].subCategory.push({
        sCategory: newSubCategoryName,
        amounts: Array(12).fill(0)
      });
      return updatedCategories;
    });
    closeModal();
  };

  // const calculateTotal = (categories) => {
  //   return categories.reduce((total, category) => {
  //     return total + category.subCategory.reduce((subTotal, subCategory) => subTotal + subCategory.amounts.reduce((a, b) => a + b, 0), 0);
  //   }, 0);
  // };

  const calculateMonthlyTotals = (categories) => {
    const monthlyTotals = Array(12).fill(0);
    categories.forEach(category => {
      category.subCategory.forEach(subCategory => {
        subCategory.amounts.forEach((amount, monthIndex) => {
          monthlyTotals[monthIndex] += amount;
        });
      });
    });
    return monthlyTotals;
  };

  return (
    <div className="budget-table">
      <h2 className="title">BudgetTable</h2>
      <div className="month">
        <label>
          Start Month:
          <select className="month-select" value={startMonth} onChange={(e) => setStartMonth(parseInt(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>
        </label>
        <label>
          End Month:
          <select className="month-select" value={endMonth} onChange={(e) => setEndMonth(parseInt(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>
        </label>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Start Peroid V End Peroid V</th>
            {Array.from({ length: 12 }, (_, i) => (
            i >= startMonth && i <= endMonth && (
            <th key={i}>{new Date(0, i).toLocaleString('default', { month: 'long' }).slice(0, 3)}</th>
            )
            ))}
          </tr>
        </thead>

        <CategoryTable 
          categories={categoryIncome}
          title="Income"
          setCategoryFunction={setCategoryIncome}
          startMonth={startMonth}
          endMonth={endMonth}
          openModal={openModal}
          calculateMonthlyTotals={calculateMonthlyTotals}
        />
        <CategoryTable 
          categories={categoryExpenses}
          title="Expenses"
          setCategoryFunction={setCategoryExpenses}
          startMonth={startMonth}
          endMonth={endMonth}
          openModal={openModal}
          calculateMonthlyTotals={calculateMonthlyTotals}
        />
        <tr>
          <td className="table-total">Closing Balance</td>
          {Array.from({ length: 12 }, (_, monthIndex) => (
            monthIndex >= startMonth && monthIndex <= endMonth && (
              <td key={monthIndex}>
                {calculateMonthlyTotals(categoryIncome)[monthIndex] - calculateMonthlyTotals(categoryExpenses)[monthIndex]}
              </td>
            )
          ))}
        </tr>
      </table>
      {isModalOpen && (
        <Modal 
          modalType={modalType} 
          closeModal={closeModal} 
          newCategoryName={newCategoryName} 
          setNewCategoryName={setNewCategoryName} 
          newSubCategoryName={newSubCategoryName} 
          setNewSubCategoryName={setNewSubCategoryName} 
          currentIndex={currentIndex} 
          addNewCategory={addNewCategory} 
          addNewSubCategory={addNewSubCategory} 
          setCategoryIncome={setCategoryIncome}
          setCategoryExpenses={setCategoryExpenses}
          categoryIncome={categoryIncome} 
          categoryExpenses={categoryExpenses} 
        />
      )}
    </div>
  );
}

export default BudgetTable;
