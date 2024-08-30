import React from "react";

const handleAmountChange = (index, subIndex, monthIndex, value, setCategoryFunction) => {
    setCategoryFunction(prevCategories => {
    const updatedCategories = [...prevCategories];
    updatedCategories[index].subCategory[subIndex].amounts[monthIndex] = parseFloat(value) || 0;
    return updatedCategories;
    });
  };

const CategoryTable = ({ categories, title, setCategoryFunction, startMonth, endMonth, openModal, calculateMonthlyTotals }) => (
  <>
    <tbody>
      <tr>
          <td colSpan={14}>{title}</td>
      </tr>
      {categories.map((category, index) => (
        <React.Fragment key={index}>
          {category.subCategory.length > 0 ? (
            <>
              {category.subCategory.map((subCategory, subIndex) => (
                <>
                  <tr key={subIndex}>
                    {subIndex === 0 && (
                      <th colSpan={14}>
                        {category.mainCategory}
                      </th>
                    )}
                  </tr>
                  <tr>
                    <td>{subCategory.sCategory}</td>
                    {subCategory.amounts.map((amounts, monthIndex) => (
                      monthIndex >= startMonth && monthIndex <= endMonth && (
                        <td key={monthIndex}>
                          <input type="number" value={amounts}
                          onChange={(e) => handleAmountChange(index, subIndex, monthIndex, e.target.value, setCategoryFunction)}
                          />
                        </td>
                      )
                    ))}
                  </tr>
                </>
              ))}
              <tr>
                <td className="table-total">Sub Totals</td>
                {Array.from({length: 12}, (_, monthIndex) => (
                  monthIndex >= startMonth && monthIndex <= endMonth && (
                    <td key={monthIndex}>
                      {category.subCategory.reduce((subTotal, subCategory) => subTotal + subCategory.amounts[monthIndex], 0)}
                    </td>
                  )))}
              </tr>
              <tr>
                <td>
                  <a href="#" onClick={() => openModal("subcategory", index)}>Add a new '{category.mainCategory}' Category</a>
                </td>
              </tr>
            </>
          ) : (
            <>
              <tr>
                <th colSpan={14}>{category.mainCategory}</th>
              </tr>
              <tr>
                <td>No subCategory</td>
                  {Array.from({ length: 12 }, (_, i) => (
                    i >= startMonth && i <= endMonth && (
                    <td key={i}>0</td>
                    )
                  ))}
              </tr>
              <tr>
                <td>
                  <a href="#" onClick={() => openModal("subcategory", index)}>Add Subcategory</a>
                </td>
              </tr>
            </>
          )}
        </React.Fragment>
      ))}
      <tr>
        <td colSpan={14}>
          <a href="#" onClick={() => openModal("category")}>Add New Parent Category</a>
        </td>
      </tr>
      <tr>
        <td><b>Total {title}</b></td>
        {Array.from({ length: 12 }, (_, monthIndex) => (
          monthIndex >= startMonth && monthIndex <= endMonth && (
          <td key={monthIndex}>
            {calculateMonthlyTotals(categories)[monthIndex]}
          </td>
          )
        ))}
    </tr>
    </tbody>
  </>
);
export default CategoryTable;