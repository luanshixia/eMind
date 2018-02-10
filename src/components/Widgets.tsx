import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ListView from '../widgets/listview';

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
  public render() {
    return (
    <div>
      <h1>Widgest</h1>
      <p>Widgets gallery.</p>

      <h2>ListView</h2>
      <p>ListView.</p>
      <ListView
        style={{ width: '300px' }}
        items={['I am boring', 'I am selected', 'I am boring', 'I am boring']}
        display={item => item}
        tooltip={item => item}
        selected={item => item === 'I am selected'}
      />
    </div>
    );
  }
}
