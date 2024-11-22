export const createErrorMessage = (inventoryId, action) =>
  `Unable to ${action} item with ID ${inventoryId}. Please try again.`;

export const removeItem = (items, inventoryId) =>
  items
    .map((cartItem) => ({
      ...cartItem,
      cartDetails: cartItem.cartDetails.filter(
        (detail) => detail.inventoryId !== inventoryId
      ),
    }))
    .filter((cartItem) => cartItem.cartDetails.length > 0);

export const updateItemQuantity = (items, inventoryId, quantity) =>
  items.map((cartItem) => ({
    ...cartItem,
    cartDetails: cartItem.cartDetails.map((detail) =>
      detail.inventoryId === inventoryId ? { ...detail, quantity } : detail
    ),
  }));

export const createCartSummary = (items) => ({
  totalItems: items.reduce(
    (count, item) =>
      count +
      item.cartDetails.reduce((sum, detail) => sum + detail.quantity, 0),
    0
  ),
  totalCost: calculateTotal(items),
});

export const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
