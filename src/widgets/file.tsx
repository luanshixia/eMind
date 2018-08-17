import * as React from 'react';
import { CommonProps, classNames } from './shared';
import './shared.css';

interface SaveAsProps extends CommonProps {
  data: any;
  type: string;
  fileName: string;
  buttonContent?: string;
}

export const SaveAs = (props: SaveAsProps) => {
  const file = new Blob([props.data], { type: props.type });
  const url = URL.createObjectURL(file);
  return (
    <a
      className="btn btn-default"
      href={url}
      download={props.fileName}
      role="button"
    >
      {props.buttonContent || 'Download'}
    </a>
  );
};
