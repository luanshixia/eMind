import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ListView from '../widgets/listview';

interface WidgetsState {
  listView1SelectedIndex: number;
  listView2SelectedIndex: number;
  listView3SelectedIndex: number;
}

interface IconShowcaseProps {
  name: string;
}

export default class Widgets extends React.Component<RouteComponentProps<{}>, WidgetsState> {
  constructor(props: RouteComponentProps<{}>) {
    super(props);

    this.state = {
      listView1SelectedIndex: 0,
      listView2SelectedIndex: 0,
      listView3SelectedIndex: 0,
    };
  }

  public render() {
    const iconShowcaseData = [
      'plus',
      'envelope',
      'pencil',
      'music',
      'search',
      'heart',
      'star',
      'ok',
      'remove',
    ];

    const IconShowcase = ({ name }: IconShowcaseProps) => {
      return (
        <span>
          <span className={'margin-space glyphicon glyphicon-' + name}></span>
          <span>{name}</span>
        </span>
      );
    };

    return (
    <div>
      <h1>Widgest</h1>
      <p>Widgets gallery.</p>

      <h2>ListView</h2>
      <p>Basic ListView.</p>
      <ListView
        style={{ width: '300px' }}
        items={['I am boring', 'I am selected', 'I am boring', 'I am boring']}
        display={(item, i) => item}
        tooltip={(item, i) => item}
        selected={(item, i) => i === this.state.listView1SelectedIndex}
        itemClick={(item, i) => this.setState({ ...this.state, listView1SelectedIndex: i })}
      />

      <p>ListView with vertical scroll.</p>
      <ListView
        cls={['shadow-border', 'round-border']}
        style={{ width: '300px', height: '200px' }}
        items={Array.from(Array(100).keys()).map(i => `${i} * ${i} = ${i * i}`)}
        display={(item, i) => item}
        tooltip={(item, i) => item}
        selected={(item, i) => i === this.state.listView2SelectedIndex}
        itemClick={(item, i) => this.setState({ ...this.state, listView2SelectedIndex: i })}
      />

      <p>ListView with custom item template.</p>
      <ListView
        style={{ width: '300px' }}
        items={iconShowcaseData}
        display={(item, i) => <IconShowcase name={item} />}
        tooltip={(item, i) => item}
        selected={(item, i) => i === this.state.listView3SelectedIndex}
        itemClick={(item, i) => this.setState({ ...this.state, listView3SelectedIndex: i })}
      />
    </div>
    );
  }
}
