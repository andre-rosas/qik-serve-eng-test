export const subTotal = (items) => {
  const reducedTotal = items.reduce((total, item) => {
    return total + (item.price / 100) * item.amount;
  }, 0);
  return reducedTotal;
};

export const TotalPrice = (total, promos) => {
  let newTotal = total;

  promos.forEach((promo) => {
    if (promo.isReducible) {
      newTotal = newTotal - promo.value;
    }
  });
  return newTotal;
};

export const calculateBasedPriceOverride = (promotions, item) => {
  const timesToApply = Math.floor(item.amount / promotions.required_qty);
  const quocient = item.amount % promotions.required_qty;
  const ttlDiscount = timesToApply * (promotions.price / 100);
  return {
    type: promotions.type,
    isReducible: true,
    value:
      (item.price / 100) * item.amount -
      (ttlDiscount + (quocient * item.price) / 100),
  };
};

export const calculateBuyXGetYFree = (item, promotions) => {
  const timesToApply = Math.floor(item.amount / promotions.required_qty);
  return {
    item: item.name,
    type: promotions.type,
    isReducible: false,
    value: (item.price / 100) * timesToApply,
    free: timesToApply,
  };
};

export const calculateFlatPercent = (item, promotions) => {
  return {
    type: promotions.type,
    isReducible: true,
    value: (item.price / 100) * (item.amount * (promotions.amount / 100)),
  };
};

export const handlePromotion = (promotions, item) => {
  switch (promotions.type) {
    case "QTY_BASED_PRICE_OVERRIDE":
      if (item.amount >= promotions.required_qty) {
        return calculateBasedPriceOverride(promotions, item);
      }
      break;
    case "BUY_X_GET_Y_FREE":
      if (item.amount >= promotions.required_qty) {
        return calculateBuyXGetYFree(item, promotions);
      }
      break;
    case "FLAT_PERCENT":
      return calculateFlatPercent(item, promotions);
    default:
      return null;
  }
  return null;
};
