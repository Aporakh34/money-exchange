import { inject } from "vue";
import { CurrencyRates } from "../services/currencyService";

export interface CurrencyContextType {
  baseCurrency: { value: string };
  rates: { value: CurrencyRates };
  isLoading: { value: boolean };
  error: { value: string | null };
  setBaseCurrency: (currency: string) => void;
  refreshRates: () => Promise<void>;
}

export function useCurrency(): CurrencyContextType {
  const currency = inject<CurrencyContextType>("currency");

  if (!currency) {
    throw new Error(
      "useCurrency must be used within a CurrencyContext component"
    );
  }

  return currency;
}
