export interface CurrencyRates {
  [key: string]: number;
}

export interface CurrencyData {
  [key: string]: any; // To accommodate the actual response format
}

const API_URL = "https://status.neuralgeneration.com/api/currency";

export const fetchCurrencyRates = async (
  baseCurrency: string
): Promise<CurrencyRates> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch currency rates");
    }

    const data: CurrencyData = await response.json();

    // The API returns data in the format "from-to": rate
    // We need to transform it to our format
    const rates: CurrencyRates = {};

    // First, set the base rate (1 base = 1 base)
    rates[baseCurrency] = 1;

    // Process direct rates for the base currency
    Object.keys(data).forEach((key) => {
      // Check if the key starts with our base currency in lowercase
      if (key.toLowerCase().startsWith(baseCurrency.toLowerCase() + "-")) {
        // Extract the target currency (after the dash)
        const targetCurrency = key.split("-")[1].toUpperCase();
        if (SUPPORTED_CURRENCIES.includes(targetCurrency)) {
          rates[targetCurrency] = data[key];
        }
      }
      // Check for inverse rates (where base is the target)
      else if (key.toLowerCase().endsWith("-" + baseCurrency.toLowerCase())) {
        // Extract the source currency (before the dash)
        const sourceCurrency = key.split("-")[0].toUpperCase();
        if (SUPPORTED_CURRENCIES.includes(sourceCurrency)) {
          rates[sourceCurrency] = 1 / data[key];
        }
      }
    });

    // Handle missing rates with fallback values
    SUPPORTED_CURRENCIES.forEach((currency) => {
      if (!rates[currency]) {
        // Set fallback rates if they don't exist
        if (currency === "USD" && baseCurrency === "RUB")
          rates[currency] = 0.01;
        else if (currency === "EUR" && baseCurrency === "RUB")
          rates[currency] = 0.009;
        else if (currency === "RUB" && baseCurrency === "USD")
          rates[currency] = 100;
        else if (currency === "EUR" && baseCurrency === "USD")
          rates[currency] = 0.92;
        else if (currency === "USD" && baseCurrency === "EUR")
          rates[currency] = 1.09;
        else if (currency === "RUB" && baseCurrency === "EUR")
          rates[currency] = 110;
        else rates[currency] = 1; // Default fallback
      }
    });

    return rates;
  } catch (error) {
    console.error("Error fetching currency rates:", error);

    // Return fallback rates
    const fallbackRates: CurrencyRates = {
      USD: baseCurrency === "USD" ? 1 : baseCurrency === "EUR" ? 1.09 : 0.01,
      EUR: baseCurrency === "EUR" ? 1 : baseCurrency === "USD" ? 0.92 : 0.009,
      RUB: baseCurrency === "RUB" ? 1 : baseCurrency === "USD" ? 100 : 110,
    };

    return fallbackRates;
  }
};

export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: CurrencyRates
): number => {
  if (!amount || isNaN(amount)) return 0;

  // If rates don't include the currencies, return 0
  if (!rates[fromCurrency] || !rates[toCurrency]) return 0;

  // Convert the amount to the target currency
  const result = (amount / rates[fromCurrency]) * rates[toCurrency];

  // Round to 2 decimal places
  return Math.round(result * 100) / 100;
};

export const SUPPORTED_CURRENCIES = ["USD", "EUR", "RUB"];

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  RUB: "₽",
};

export const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  RUB: "Russian Ruble",
};
