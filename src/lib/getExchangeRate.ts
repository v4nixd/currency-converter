import { fetchExchangeRates } from "./fetchExchangeRates";

export async function getExchangeRate(
  from: string,
  to: string,
  setLastUpdate: (date: Date) => void
): Promise<number> {
  const rates = await fetchExchangeRates(setLastUpdate);

  const fromRate =
    from === "UAH" ? 1 : rates.find((r) => r.cc === from)?.rate ?? null;

  const toRate =
    to === "UAH" ? 1 : rates.find((r) => r.cc === to)?.rate ?? null;

  if (!fromRate || !toRate)
    throw new Error(`Exchange rate not found for ${from} or ${to}`);

  return toRate / fromRate;
}
