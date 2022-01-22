const Cart = ({ consumables }) => (
  <div className="overflow-x-auto w-full flex justify-evenly">
    <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
      <thead className="bg-gray-900">
        <tr className="text-white text-center">
          <th className="font-semibold text-lg uppercase px-6 py-4 text-center">
            Amount
          </th>
          <th className="font-semibold text-lg uppercase px-6 py-4 text-center">
            Added Products
          </th>
          <th className="font-semibold text-lg uppercase px-6 py-4 text-center">
            Price
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {consumables &&
          consumables.map((consumable) => {
            if (consumable.amount !== 0) {
            return (
              <tr key={consumable.id}>
                <td className="px-6 py-4 text-xl">{consumable.amount}</td>
                <td className="px-6 py-4 text-xl">{consumable.name}</td>
                <td className="px-6 py-4 text-xl">
                  £ {((consumable.price / 100) * consumable.amount).toFixed(2)}
                </td>
              </tr>
            )} else {
              return <></>
            };
          })}
      </tbody>
    </table>
  </div>
);

export default Cart;
