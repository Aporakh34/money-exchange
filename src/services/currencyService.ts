export interface CurrencyRates {
  [key: string]: number;
}

export interface CurrencyData {
  [key: string]: any; 
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

    const rates: CurrencyRates = {};

    rates[baseCurrency] = 1;

    Object.keys(data).forEach((key) => {
      if (key.toLowerCase().startsWith(baseCurrency.toLowerCase() + "-")) {
        const targetCurrency = key.split("-")[1].toUpperCase();
        if (SUPPORTED_CURRENCIES.includes(targetCurrency)) {
          rates[targetCurrency] = data[key];
        }
      }
      else if (key.toLowerCase().endsWith("-" + baseCurrency.toLowerCase())) {
        const sourceCurrency = key.split("-")[0].toUpperCase();
        if (SUPPORTED_CURRENCIES.includes(sourceCurrency)) {
          rates[sourceCurrency] = 1 / data[key];
        }
      }
    });

    SUPPORTED_CURRENCIES.forEach((currency) => {
      if (!rates[currency]) {
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
        else rates[currency] = 1; 
      }
    });

    return rates;
  } catch (error) {
    console.error("Error fetching currency rates:", error);

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

  if (!rates[fromCurrency] || !rates[toCurrency]) return 0;

  const result = (amount / rates[fromCurrency]) * rates[toCurrency];

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
