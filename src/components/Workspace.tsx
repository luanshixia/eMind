import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface WorkspaceProps {

}

interface WorkspaceState {
  
}

export default class Workspace extends React.Component<RouteComponentProps<{}>, {}> {
  public render() {
    return (
    <div>
      <h1>Workspace</h1>
      <p>Welcome to your mind map workspace.</p>
    </div>
    );
  }
}
