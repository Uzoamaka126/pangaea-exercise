const formatCurrency = (amount = 0, currency) => {
  if (isNaN(amount)) {
    amount = 0;
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default formatCurrency;
