export interface NbuRate {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
}

export async function fetchExchangeRates(
  setLastUpdate: (date: Date) => void
): Promise<NbuRate[]> {
  const res = await fetch(
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch exchange rates: ${res.status}`);
  }

  setLastUpdate(new Date());
  return res.json();
}
