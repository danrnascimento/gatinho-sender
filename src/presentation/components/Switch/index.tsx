import React, {
  FC,
  ChangeEventHandler,
  PropsWithChildren,
  useState,
} from "react";
import { SwitchIndicator } from "./style";

export type SwitchComponentProps = PropsWithChildren<{
  name: string;
  id: string;
  className?: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}>;

type SwitchComponent = FC<SwitchComponentProps>;

export const Switch: SwitchComponent = ({
  id,
  name,
  children,
  checked = false,
  className,
  onChange,
}) => {
  const [isChecked, setChecked] = useState(checked);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.currentTarget.checked);
    setChecked(event.currentTarget.checked);
  };

  return (
    <label
      htmlFor={id}
      role="switch"
      aria-checked={isChecked}
      className={className}
    >
      {children}
      <SwitchIndicator checked={isChecked} />
      <input
        type="checkbox"
        checked={isChecked}
        name={name}
        id={id}
        onChange={handleChange}
        hidden
      />
    </label>
  );
};
