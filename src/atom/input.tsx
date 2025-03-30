import React from "react";

export interface InputProps {
  value?: string;
  onChange: (val: string) => void;
  "data-testid"?: string;
  onBlur?: () => void;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({
  "data-testid": dataTestId,
  onChange,
  onBlur = () => {},
  maxLength,
  ...props
}) => {
  return (
    <input
      className="border-[1px] rounded-medium border-neutral-300 py-m px-s w-full min-w-[280px]"
      onChange={(evt) => onChange(evt.currentTarget.value)}
      data-testid={dataTestId}
      onBlur={onBlur}
      maxLength={maxLength}
      {...props}
    />
  );
};

export default Input;
