import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ListView from '../widgets/listview';

interface WidgetsState {
  listViewSelectedIndex: number;
}

export default class Widgets extends React.Component<RouteComponentProps<{}>, WidgetsState> {
  constructor(props: RouteComponentProps<{}>) {
    super(props);

    this.state = {
      listViewSelectedIndex: 0
    };
  }

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
        display={(item, i) => item}
        tooltip={(item, i) => item}
        selected={(item, i) => i === this.state.listViewSelectedIndex}
        itemClick={(item, i) => this.setState({ ...this.state, listViewSelectedIndex: i })}
      />
    </div>
    );
  }
}
