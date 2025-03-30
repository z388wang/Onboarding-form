import React, { PropsWithChildren, type JSX } from "react";

export interface PositionedHeroIconProps {
  icon: JSX.Element;
  position?: "left" | "right" | "top" | "bottom";
  className?: string;
}
export interface BaseButtonProps {
  "data-testid"?: string;
  onClick: () => void;
  icon?: PositionedHeroIconProps;
}

const Button: React.FC<PropsWithChildren<BaseButtonProps>> = ({
  "data-testid": dataTestId,
  children,
  icon,
  onClick,
  ...props
}) => {
  const wrapperClassName = `hover:text-neutral-300 cursor-pointer hover:bg-neutral-800 flex bg-neutral-900 text-neutral-0 flex-grow w-full relative border-box inline-flex items-center justify-center cursor-default rounded-medium text-body2Medium py-l
    ${icon ? "px-l" : "px-xl"} 
    `;

  return (
    <button
      className={wrapperClassName}
      onClick={onClick}
      data-testid={dataTestId}
      {...props}
    >
      <div
        className={`inline-flex items-center justify-center gap-s whitespace-nowrap`}
      >
        {icon && icon.position === "left" && icon.icon}
        {children}
        {icon && icon.position !== "left" && icon.icon}
      </div>
    </button>
  );
};

export default Button;
