import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";

export const ItemFinderUnplugged = ({ onAddItem, items, selectedItems }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSetSelectedItem = (value) => {
    if (value) {
      if (value === "empty-option") {
      } else {
        setSelectedItem(value);
      }
    }
  };

  const handleAddItem = (item) => {
    const found = selectedItems.find(
      (selectedItem) => selectedItem.id === item.id
    );
    if (!found) {
      onAddItem([...selectedItems, { ...item, amount: 1 }]);
    } else {
      const items = selectedItems.filter(
        (selectedItem) => selectedItem.id !== item.id
      );
      found.amount = found.amount + 1;
      onAddItem([...items, found]);
    }
  };

  const handleRemoveItem = (item) => {
    const found = selectedItems.find(
      (selectedItem) => selectedItem.id === item.id
    );
    if (!found) {
      onAddItem([...selectedItems, { ...item, amount: 1 }]);
    } else {
      const items = selectedItems.filter(
        (selectedItem) => selectedItem.id !== item.id
      );
      if (found.amount >= 1) {
        found.amount = found.amount - 1;
        onAddItem([...items, found]);
      } else {
        found.amount = 0;
        setSelectedItem(null);
      }
    }
  };

  return (
    <div className="mb-8">
      <div className="my-8">
        <select
          className="text-lg border-2 py-4 pl-2 rounded border-red-700 border-opacity-75"
          onChange={(value) => handleSetSelectedItem(value.target.value)}
        >
          <option className="text-lg" key="empty-option" value="empty-option">
            Choose your product by the following menu:
          </option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <button
        disabled={selectedItem === null}
        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-800"
        onClick={() =>
          handleAddItem(items.find(({ id }) => id === selectedItem))
        }
      >
        <span className="relative flex flex-col .items.center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <Fragment>
            <span className="text-lg text-center">{"Add to"}</span>
            <FaShoppingCart className="text-lg text-center w-auto" />
          </Fragment>
        </span>
      </button>
      <button
        hidden={selectedItem === null}
        disabled={items.amount === 0}
        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400"
        onClick={() =>
          handleRemoveItem(items.find(({ id }) => id === selectedItem))
        }
      >
        {selectedItem !== null ? (
          <span className="relative flex flex-col px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <Fragment>
              <span className="text-lg text-center">{"Remove"}</span>
              <FaShoppingCart className="text-lg text-center w-auto" />
            </Fragment>
          </span>
        ) : (
          <span className="hidden">{""}</span>
        )}
      </button>
    </div>
  );
};

const ItemFinder = ({ onAddItem, selectedItems }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3000/products");
      setItems(result.data);
    };
    fetchData();
  }, []);

  return (
    <ItemFinderUnplugged
      onAddItem={onAddItem}
      items={items}
      selectedItems={selectedItems}
    />
  );
};

export default ItemFinder;
