export const CalculateTotalPrice = (cart) => {
  const totalPrice = cart?.reduce(
    (accumulator, item) => accumulator + item?.price * item?.quantity,
    0
  );

  const discountedPrice = totalPrice * 0.1; // Aslında çıkan fiyatın %10'u

  return totalPrice + discountedPrice;
};
