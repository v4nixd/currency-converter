import { getExchangeRate } from "./getExchangeRate";

export async function convertCurrency(
  amount: number,
  from: string,
  to: string,
  setLastUpdate: (date: Date) => void = () => {}
): Promise<number> {
  const rate = await getExchangeRate(from, to, setLastUpdate);
  return amount * rate;
}
