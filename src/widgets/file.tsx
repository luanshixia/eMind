import * as React from 'react';
import { CommonProps, classNames } from './shared';
import './shared.css';

interface SaveAsProps extends CommonProps {
  data: any;
  type: string;
  fileName: string;
  buttonContent?: string;
}

interface OpenProps extends CommonProps {
  allowMultiple?: boolean;
  filter?: string;
  buttonContent?: string;
  onLoad: React.ChangeEventHandler<HTMLInputElement>;
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

export const Open = (props: OpenProps) => {
  return (
    <div
      className="file-upload btn btn-default"
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <span>
        {props.buttonContent || 'Open'}
      </span>
      <input
        type="file"
        accept={props.filter}
        multiple={props.allowMultiple}
        onChange={props.onLoad}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: 0,
          padding: 0,
          cursor: 'pointer',
          opacity: 0,
          filter: 'alpha(opacity=0)'
        }}
      />
    </div>
  );
};
