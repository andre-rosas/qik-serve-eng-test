import { useState, useEffect } from "react";
import axios from "axios";

import { subTotal, TotalPrice, handlePromotion } from "../../utils/Reducers";

export const CartCheckout = ({
  items: consumables,
  showTable,
  fullInfoItems,
  setShowTable,
}) => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPromos, setTotalPromos] = useState(0);
  const [freeItems, setFreeItems] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  const handleCartReducer = () => {
    if (consumables) {
      setShowTable(true);
      const total = handleTotal();
      const promos = handleTotalPromos();
      handleTotalPayable(total, promos);
    }
  };

  const handleTotalPayable = (total, promos) => {
    let newTotal = TotalPrice(total, promos);
    setTotalPayable(newTotal);
  };

  const handleTotal = () => {
    const reducedTotal = subTotal(consumables);
    setTotalItems(reducedTotal);
    return reducedTotal;
  };

  const handleTotalPromos = () => {
    let promosList = [];
    consumables.forEach((item) => {
      const found = fullInfoItems.find(({ id }) => item.id === id);
      if (found) {
        const { promotions } = found;
        if (promotions) {
          promotions.forEach((promotion) => {
            const result = handlePromotion(promotion, item);
            if (result) {
              result.isReducible
                ? promosList.push(result)
                : setFreeItems(result);
            }
          });
        }
      }
    });
    const reducedPromos = promosList.reduce((newTotal, item) => {
      return newTotal + item.value;
    }, 0);
    setTotalPromos(reducedPromos);
    return promosList;
  };

  return (
    <div className="mt-4 mb-10 sm:mb-40">
      <div className="overflow-x-auto w-full flex justify-evenly my-4">
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={handleCartReducer}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-lg bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Checkout
          </span>
        </button>
      </div>
      {showTable && (
        <div className="overflow-x-auto w-full flex justify-evenly">
          <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
            <thead className="bg-gray-900 w-full">
              <tr className="text-white text-center">
                <th className="font-semibold uppercase px-6 py-4 text-lg text-center">
                  Subtotal
                </th>
                <th className="font-semibold uppercase px-6 py-4 text-lg text-center">
                  Promos
                </th>
                <th className="font-semibold uppercase px-6 py-4 text-lg text-center">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td classname="px-6 py-4 text-center text-xl">
                  £ {totalItems.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center text-xl">
                  £ {totalPromos.toFixed(2)}
                  {freeItems !== 0 && (
                    <span>
                      + {freeItems.free}X {freeItems.item} saving £
                      {freeItems.value.toFixed(2)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center text-xl">
                  £ {totalPayable.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const CartReducer = ({ items }) => {
  const [fullInfoItems, setFullInfoItems] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchData = async (id) => {
      const found = fullInfoItems.find((item) => item.id === id);
      if (!found) {
        const result = await axios.get(`localhost:3000/products/${id}`);

        setFullInfoItems([...fullInfoItems, result.data]);
      }
    };
    if (items) {
      items.forEach((item) => {
        fetchData(item.id);
      });
    }
    setShowTable(false);
  }, [items]);

  return (
    <CartCheckout
      showTable={showTable}
      fullInfoItems={fullInfoItems}
      items={items}
      setShowTable={setShowTable}
    />
  );
};

export default CartReducer;
