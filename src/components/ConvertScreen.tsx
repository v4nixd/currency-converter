import HeaderBar from "./HeaderBar";
import CurrencySelectorGroup from "./CurrencySelectorGroup";
import AmountDisplay from "./AmountDisplay";
import AmountInput from "./AmountInput";
import AmountDisplayGroup from "./AmountDisplayGroup";

const ConvertScreen = () => {
  return (
    <main className="flex min-h-screen w-full max-w-3xl flex-col items-center sm:items-start">
      <HeaderBar title="Convert" />
      <CurrencySelectorGroup />
      <AmountDisplayGroup>
        <AmountInput />
        <AmountDisplay />
      </AmountDisplayGroup>
      <p>Experimental build!</p>
    </main>
  );
};

export default ConvertScreen;
