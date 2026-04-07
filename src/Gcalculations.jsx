/**
 * Calculates the Cost of Goods Sold (COGS) using Gross Margin.
 * @param {number} monthlySalesRevenue - The monthly sales revenue input by the user.
 * @param {number} grossMargin - The Gross Margin percentage (e.g., 80 for 80%).
 * @returns {number} - The calculated Cost of Goods Sold.
 */
export const calculateCostOfGoodsSold = (monthlySalesRevenue, grossMargin) => {
    // Convert Gross Margin to COGS multiplier (100% - Gross Margin)
    const multiplier = (100 - grossMargin) / 100;
  
    if (!monthlySalesRevenue || isNaN(monthlySalesRevenue) || isNaN(grossMargin)) {
      return 0; // Return 0 if invalid input
    }
  
    return monthlySalesRevenue * multiplier;
  };
  
  /**
   * Calculates the Gross Profit (GP).
   * @param {number} monthlySalesRevenue - The monthly sales revenue input by the user.
   * @param {number} costOfGoodsSold - The calculated cost of goods sold.
   * @returns {number} - The calculated Gross Profit.
   */
  export const calculateGrossProfit = (monthlySalesRevenue, costOfGoodsSold) => {
    if (
      (!monthlySalesRevenue || isNaN(monthlySalesRevenue)) ||
      (!costOfGoodsSold || isNaN(costOfGoodsSold))
    ) {
      return 0; // Return 0 if invalid input
    }
    return monthlySalesRevenue - costOfGoodsSold;
  };
  
  /**
 * Calculates the Total Operating Expenses.
 * @param {number} monthlySalesRevenue - The monthly sales revenue input by the user.
 * @param {number} costOfGoodsSold - The calculated cost of goods sold.
 * @param {number} grossProfit - The calculated gross profit.
 * @param {number} grossMargin - The Gross Margin percentage (e.g., 80 for 80%).
 * @returns {number} - The calculated Total Operating Expenses.
 */
export const calculateTotalOperatingExpenses = (
  monthlySalesRevenue,
  costOfGoodsSold,
  grossProfit,
  grossMargin
) => {
  if (
    isNaN(monthlySalesRevenue) ||
    isNaN(costOfGoodsSold) ||
    isNaN(grossProfit) ||
    isNaN(grossMargin)
  ) {
    return 0; // Return 0 if invalid input
  }

  // Calculate total operating expenses using the new formula
  const totalOperatingExpenses =
    (monthlySalesRevenue + costOfGoodsSold + grossProfit) * (grossMargin / 1000);

  return totalOperatingExpenses;
};

  
  /**
   * Calculates the Net Business Profit.
   * @param {number} grossProfit - The calculated gross profit.
   * @param {number} totalOperatingExpenses - The calculated total operating expenses.
   * @returns {number} - The calculated Net Business Profit.
   */
  export const calculateNetBusinessProfit = (grossProfit, totalOperatingExpenses) => {
    if (
      (isNaN(grossProfit) || !grossProfit) ||
      (isNaN(totalOperatingExpenses) || !totalOperatingExpenses)
    ) {
      return 0; // Return 0 if invalid input
    }
    return grossProfit - totalOperatingExpenses;
  };
  
  /**
   * Calculates the Household Surplus.
   * @param {number} netBusinessProfit - The net business profit calculated.
   * @param {number} otherIncome - The other income input by the user.
   * @param {number} householdExpenses - The household expenses input by the user.
   * @returns {number} - The calculated Household Surplus.
   */
  export const calculateHouseholdSurplus = (netBusinessProfit, otherIncome, householdExpenses) => {
    if (
      isNaN(netBusinessProfit) ||
      isNaN(otherIncome) ||
      isNaN(householdExpenses)
    ) {
      return 0; // Return 0 if invalid input
    }
    return netBusinessProfit + otherIncome - householdExpenses;
  };
  