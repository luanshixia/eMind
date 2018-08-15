import * as React from 'react';
import { CommonProps, classNames, toggleArrayElement } from './shared';
import './shared.css';

interface DialogProps extends CommonProps {
  title: string;
  opened: boolean;
}

export const Dialog = (props: DialogProps) => {
  return (
    <div className="modal fade" tabIndex={-1} role="dialog" style={{ display: !props.opened ? 'none' : 'initial' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-body">
            {props.children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary">OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};
