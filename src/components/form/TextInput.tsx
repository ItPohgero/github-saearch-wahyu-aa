/* eslint-disable react/display-name */
import classNames from 'classnames';
import React, { forwardRef } from 'react';

const TextInput = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((props: any, ref: any) => (
  <input
    {...props}
    ref={ref}
    className={classNames(
      `hover:border-slate-500 ${props.disabled ? "bg-slate-100" : ""} outline-none bg-transparent text-slate-600 font-light text-xs md:text-sm py-2`,
      props.className,
    )}
  />
));

export default TextInput;
