import React, { ReactElement } from "react";
import Input, { InputProps } from "./input";

export interface FormInputProps extends InputProps {
  label?: string | ReactElement;
  onChange: (val: string) => void;
  errorMessage?: string;
  "data-testid"?: string;
  onBlur?: () => void;
  maxLength?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  label = "",
  errorMessage = "",
  onChange,
  onBlur = () => {},
  "data-testid": dataTestId,
  maxLength,
  ...props
}) => {
  return (
    <section className="form-input flex flex-grow rounded-medium border-neutral-300 bg-white text-body2Regular text-neutral-800 w-full">
      <label className="relative flex w-full flex-col text-body1Medium text-neutral-800 gap-xs">
        {label && <span className="mb-s block">{label}</span>}
        <div className="relative flex">
          <Input
            onChange={onChange}
            data-testid={dataTestId}
            onBlur={onBlur}
            maxLength={maxLength}
            {...props}
          />
        </div>
        <span className="text-microNormal text-red border-red min-h-l">
          {errorMessage}
        </span>
      </label>
    </section>
  );
};

export default FormInput;
