import * as React from 'react';
import { CommonProps, classNames } from './shared';
import './shared.css';

interface DialogProps extends CommonProps {
  title: string;
  isOpen: boolean;
  onOk?: React.EventHandler<any>;
  onClose?: React.EventHandler<any>;
}

interface InputDialogProps extends DialogProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  description?: string;
  hint?: string;
}

export const Dialog = (props: DialogProps) => {
  return (
    <div>
      <div
        className={classNames('modal', 'fade', { in: props.isOpen })}
        tabIndex={-1}
        role="dialog"
        style={{ display: props.isOpen ? 'block' : 'none' }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{props.title}</h4>
            </div>
            <div className="modal-body">
              {props.children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={props.onClose}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={props.onOk}>OK</button>
            </div>
          </div>
        </div>
      </div>
      {props.isOpen && <div className="modal-backdrop fade in"></div>}
    </div>
  );
};

export const InputDialog = (props: InputDialogProps) => {
  return (
    <Dialog
      title={props.title}
      isOpen={props.isOpen}
      onOk={props.onOk}
      onClose={props.onClose}
    >
      {props.description && <p>{props.description}</p>}
      <input type="text" className="form-control" value={props.value} onChange={props.onChange} placeholder={props.hint} />
    </Dialog>
  );
};
