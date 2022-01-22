import { useState } from "react";
import "./styles/global.css";
import "tailwindcss/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Cart from "./components/Cart/index";
import ItemFinder from "./components/ItemFinder/index";
import CartReducer from "./components/CartReducer/index";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";

import "./App.css";

const App = () => {
  const [selectedConsumables, setSelectedConsumables] = useState([]);

  return (
    <div className="App">
      <div className="mb-48 sm:min-h-full sm:h-full">
        <Header />
        <ItemFinder
          onAddItem={setSelectedConsumables}
          selectedItems={selectedConsumables}
        />
        {selectedConsumables.length !== 0 ? (
          <Cart consumables={selectedConsumables} />
        ) : (
          <div>
            <span></span>
          </div>
        )}
        {selectedConsumables.length !== 0 && (
          <CartReducer items={selectedConsumables} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
