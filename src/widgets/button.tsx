import * as React from 'react';
import { CommonProps, classNames, getEnvDict } from './shared';
import './shared.css';

interface ButtonProps extends CommonProps {
  look?: string;
  feel?: 'hollow' | 'clear';
  size?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  extraAttributes?: any;
}

const cssLib: string = getEnvDict()['cssLib'] || 'bootstrap3';

const baseClass: { [key: string]: string } = {
  bootstrap3: 'btn',
  bootstrap4: 'btn',
  foundation6: 'button',
  semanticui: 'ui button'
};

const defaultLook: { [key: string]: string } = {
  bootstrap3: 'btn-default',
  bootstrap4: 'btn-secondary',
  foundation6: '',
  semanticui: ''
};

function getLook(props: ButtonProps) {
  if (props.look) {
    if (cssLib === 'bootstrap4') {
      const prefix = props.feel === 'hollow' ? 'btn-outline-' : 'btn-';
      return prefix + props.look;
    } else if (cssLib === 'bootstrap3') {
      return 'btn-' + props.look;
    }
    return props.look;
  }
  return defaultLook[cssLib];
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      id={props.id}
      className={classNames(props.feel, baseClass[cssLib], getLook(props), props.size, {
        active: !!props.isActive,
        disabled: cssLib === 'bootstrap3' && !!props.isDisabled
      })}
      type="button"
      disabled={cssLib !== 'bootstrap3' && !!props.isDisabled}
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

export const SuccessButton = (props: ButtonProps) => {
  return (
    <Button {...props} look="success">{props.children}</Button>
  );
};

export const InfoButton = (props: ButtonProps) => {
  return (
    <Button {...props} look="info">{props.children}</Button>
  );
};

export const WarningButton = (props: ButtonProps) => {
  return (
    <Button {...props} look="warning">{props.children}</Button>
  );
};

export const DangerButton = (props: ButtonProps) => {
  return (
    <Button {...props} look="danger">{props.children}</Button>
  );
};

export const LinkButton = (props: ButtonProps) => {
  return (
    <Button {...props} look="link">{props.children}</Button>
  );
};

export const HollowButton = (props: ButtonProps) => {
  return (
    <Button {...props} feel="hollow">{props.children}</Button>
  );
};
