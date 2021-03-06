import * as React from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends React.Component<{}, {}> {
  public render() {
    return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <NavMenu />
        </div>
        <div className="col-sm-10">
          {this.props.children}
          <footer style={{ marginTop: 100, marginBottom: 50 }}>2018 Yang Wang</footer>
        </div>
      </div>
    </div>
    );
  }
}
