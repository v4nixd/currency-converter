export interface Currency {
  code: string;
  name: string;
  countryCode: string;
  symbol: string;
}

export const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", countryCode: "US", symbol: "$" },
  { code: "EUR", name: "Euro", countryCode: "EU", symbol: "€" },
  { code: "CZK", name: "Czech Koruna", countryCode: "CZ", symbol: "Kč" },
  { code: "UAH", name: "Ukrainian Hryvnia", countryCode: "UA", symbol: "₴" },
  {
    code: "GBP",
    name: "British Poung Sterling",
    countryCode: "GB",
    symbol: "£",
  },
  { code: "JPY", name: "Japanese Yen", countryCode: "JP", symbol: "¥" },
];
