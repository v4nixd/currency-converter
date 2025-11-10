import { FC } from "react";

interface AmountDisplayGroupProps {
  children?: React.ReactNode;
}

const AmountDisplayGroup: FC<AmountDisplayGroupProps> = ({ children }) => {
  return <div className="flex w-full gap-4 mt-4">{children}</div>;
};

export default AmountDisplayGroup;
