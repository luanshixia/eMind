import * as React from 'react';
import { CommonProps, classNames } from './shared';
import './shared.css';

interface ButtonProps extends CommonProps {
  look?: string;
  size?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  extraAttributes?: any;
}

export const Button = (props: ButtonProps) => {
  const lookClass = props.look ? `btn-${props.look}` : 'btn-default';
  const sizeClass = props.size ? `btn-${props.size}` : undefined;
  return (
    <button
      id={props.id}
      className={classNames('btn', lookClass, sizeClass, {
        active: !!props.isActive,
        disabled: !!props.isDisabled
      })}
      onClick={props.onClick}
      onDoubleClick={props.onDoubleClick}
      {...(props.extraAttributes || {})}
    >
      {props.children}
    </button>
  );
};

export const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button {...props} look="primary">{props.children}</Button>
  );
};
