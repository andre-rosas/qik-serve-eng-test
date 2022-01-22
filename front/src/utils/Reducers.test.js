import {
  subTotal,
  TotalPrice,
  calculateBasedPriceOverride,
  calculateBuyXGetYFree,
  calculateFlatPercent,
  handlePromotion,
} from "./Reducers";

test("calculate total price using one product", () => {
  const items = [
    {
      price: 100,
      amount: 1,
    },
  ];
  const result = subTotal(items);
  expect(result).toBe(1);
});

test("calculate total using 4 products", () => {
  const items = [
    {
      price: 100,
      amount: 4,
    },
  ];
  const result = subTotal(items);
  expect(result).toBe(4);
});

test("calc total payable without promos", () => {
  const result = TotalPrice(100, []);
  expect(result).toBe(100);
});

test("calc total payable with one promo", () => {
  const promos = [
    {
      isReducible: true,
      value: 1,
    },
  ];
  const result = TotalPrice(100, promos);
  expect(result).toBe(99);
});

test("calc total payable with one promo, but not reducible", () => {
  const promos = [
    {
      isReducible: false,
      value: 1,
    },
  ];
  const result = TotalPrice(100, promos);
  expect(result).toBe(100);
});

test("calc promo based price override", () => {
  const promotions = {
    required_qty: 2,
    price: 1000,
    type: "QTY_BASED_PRICE_OVERRIDE",
  };

  const item = {
    amount: 2,
    price: 600,
  };
  const result = calculateBasedPriceOverride(promotions, item);
  expect(result.isReducible).toBe(true);
  expect(result.type).toBe("QTY_BASED_PRICE_OVERRIDE");
  expect(result.value).toBe(2);
});

test("calc promo buy X get Y free", () => {
  const promotions = {
    required_qty: 2,
    type: "BUY_X_GET_Y_FREE",
  };

  const item = {
    amount: 2,
    price: 1000,
    name: "Burger",
  };
  const result = calculateBuyXGetYFree(item, promotions);
  expect(result.isReducible).toBe(false);
  expect(result.type).toBe("BUY_X_GET_Y_FREE");
  expect(result.item).toBe("Burger");
  expect(result.free).toBe(1);
  expect(result.value).toBe(10);
});

test("calc promo flat percent", () => {
  const promotions = {
    required_qty: 2,
    type: "FLAT_PERCENT",
    amount: 10,
  };

  const item = {
    amount: 2,
    price: 1000,
    name: "Burger",
  };
  const result = calculateFlatPercent(item, promotions);
  expect(result.isReducible).toBe(true);
  expect(result.type).toBe("FLAT_PERCENT");
  expect(result.value).toBe(2);
});

test("handle promo based price override", () => {
  const promotions = {
    required_qty: 2,
    price: 1000,
    type: "QTY_BASED_PRICE_OVERRIDE",
  };

  const item = {
    amount: 2,
    price: 600,
  };
  const result = handlePromotion(promotions, item);
  expect(result.isReducible).toBe(true);
  expect(result.type).toBe("QTY_BASED_PRICE_OVERRIDE");
  expect(result.value).toBe(2);
});

test("handle promo based price override, but without amount enough", () => {
  const promotions = {
    required_qty: 2,
    price: 1000,
    type: "QTY_BASED_PRICE_OVERRIDE",
  };

  const item = {
    amount: 1,
    price: 600,
  };
  const result = handlePromotion(promotions, item);
  expect(result).toBe(null);
});

test("handle promo buy X get Y free", () => {
  const promotions = {
    required_qty: 2,
    type: "BUY_X_GET_Y_FREE",
  };

  const item = {
    amount: 2,
    price: 1000,
    name: "Burger",
  };
  const result = handlePromotion(promotions, item);
  expect(result.isReducible).toBe(false);
  expect(result.type).toBe("BUY_X_GET_Y_FREE");
  expect(result.item).toBe("Burger");
  expect(result.free).toBe(1);
  expect(result.value).toBe(10);
});

test("handle promo buy X get Y free, but without amount enough", () => {
  const promotions = {
    required_qty: 2,
    type: "BUY_X_GET_Y_FREE",
  };

  const item = {
    amount: 1,
    price: 1000,
    name: "Burger",
  };
  const result = handlePromotion(promotions, item);
  expect(result).toBe(null);
});

test("handle promo flat percent", () => {
  const promotions = {
    required_qty: 2,
    type: "FLAT_PERCENT",
    amount: 10,
  };

  const item = {
    amount: 2,
    price: 1000,
    name: "Burger",
  };
  const result = handlePromotion(promotions, item);
  expect(result.isReducible).toBe(true);
  expect(result.type).toBe("FLAT_PERCENT");
  expect(result.value).toBe(2);
});

test("handle undefined promo", () => {
  const promotions = {
    type: "unknown",
  };

  const item = {
    amount: 1,
    price: 1000,
    name: "Burger",
  };
  const result = handlePromotion(promotions, item);
  expect(result).toBe(null);
});
