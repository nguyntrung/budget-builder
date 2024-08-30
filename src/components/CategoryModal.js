const Modal = ({ modalType, closeModal, newCategoryName, setNewCategoryName, newSubCategoryName, setNewSubCategoryName, currentIndex, addNewCategory, addNewSubCategory, setCategoryIncome, setCategoryExpenses, categoryIncome, categoryExpenses }) => {
  const handleAddCategory = () => {
    if (newCategoryName.trim() !== '') {
      if (modalType === "category") {
        if (currentIndex === 1) {
          addNewCategory(setCategoryIncome);
        } else {
          addNewCategory(setCategoryExpenses);
        }
      }
    } else {
      document.getElementById("error").innerText = "Category name cannot be empty";
    }
  };

  const handleAddSubCategory = () => {
    if (newSubCategoryName.trim() !== '') {
      if (modalType === "subcategory") {
        if (currentIndex < categoryIncome.length) {
          addNewSubCategory(currentIndex, setCategoryIncome);
        } else {
          addNewSubCategory(currentIndex - categoryIncome.length, setCategoryExpenses);
        }
      }
    } else {
      document.getElementById("error").innerText = "Subcategory name cannot be empty";
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>×</span>
        {modalType === "category" && (
          <>
            <label>
              <h2>New Parent Category</h2>
              <input type="text" value={newCategoryName} autoFocus onChange={(e) => setNewCategoryName(e.target.value)} />
            </label>
            <p id="error"></p>
            <button onClick={handleAddCategory}>Add</button>
          </>
        )}
        {modalType === "subcategory" && (
          <>
            <label>
              <h2>New Subcategory</h2>
              <input type="text" value={newSubCategoryName} autoFocus onChange={(e) => setNewSubCategoryName(e.target.value)} />
            </label>
            <p id="error"></p>
            <button onClick={handleAddSubCategory}>Add</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
