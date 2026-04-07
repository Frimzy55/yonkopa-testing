export const calculateCostOfGoodsSold = (monthlySalesRevenue, grossMargin) => {
  const multiplier = (100 - grossMargin) / 100;
  if (!monthlySalesRevenue || isNaN(monthlySalesRevenue) || isNaN(grossMargin)) return 0;
  return monthlySalesRevenue * multiplier;
};

export const calculateGrossProfit = (monthlySalesRevenue, costOfGoodsSold) => {
  if ((!monthlySalesRevenue || isNaN(monthlySalesRevenue)) ||
      (!costOfGoodsSold || isNaN(costOfGoodsSold))) return 0;
  return monthlySalesRevenue - costOfGoodsSold;
};

export const calculateTotalOperatingExpenses = (monthlySalesRevenue, costOfGoodsSold, grossProfit, grossMargin) => {
  if (isNaN(monthlySalesRevenue) || isNaN(costOfGoodsSold) || isNaN(grossProfit) || isNaN(grossMargin)) return 0;
  return (monthlySalesRevenue + costOfGoodsSold + grossProfit) * (grossMargin / 1000);
};

export const calculateNetBusinessProfit = (grossProfit, totalOperatingExpenses) => {
  if (isNaN(grossProfit) || isNaN(totalOperatingExpenses)) return 0;
  return grossProfit - totalOperatingExpenses;
};

export const calculateHouseholdSurplus = (netBusinessProfit, otherIncome, householdExpenses) => {
  if (isNaN(netBusinessProfit) || isNaN(otherIncome) || isNaN(householdExpenses)) return 0;
  return netBusinessProfit + otherIncome - householdExpenses;
};