import * as React from 'react';
import { CommonProps, classNames, toggleArrayElement } from './shared';
import './shared.css';

interface PGenericProps extends CommonProps {
}

interface CGenericProps extends CommonProps {
}

interface CGenericState {
}

export const PGeneric = (props: PGenericProps) => {
  return (
    <div
    >
    </div>
  );
};

export class CGeneric extends React.Component<CGenericProps, CGenericState> {

  tempData: any;

  constructor(props: CGenericProps) {
    super(props);

    this.tempData = {
    };

    this.state = {
    };
  }

  render() {
    return (
    <PGeneric
    >
    </PGeneric>
    );
  }
}
