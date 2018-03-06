import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toggleArrayElement } from '../widgets/shared';
import ListView from '../widgets/listview';
import TreeView from '../widgets/treeview';

interface WidgetsState {
  listView1SelectedIndex: number;
  listView2SelectedIndex: number;
  listView3SelectedIndex: number;
  treeView1ExpandedNodes: string[];
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
      treeView1ExpandedNodes: ['0'],
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

    const simpleTreeData = {
      'header': 'Root',
      'children': [
        {
          'header': '1',
          'children': [
            { 'header': '1.1' },
            { 'header': '1.2' },
            { 'header': '1.3' },
          ]
        },
        {
          'header': '2',
          'children': [
            { 'header': '2.1' },
            { 'header': '2.2' },
            { 'header': '2.3' },
          ]
        },
        {
          'header': '3',
          'children': [
            { 'header': '3.1' },
            { 'header': '3.2' },
            { 'header': '3.3' },
          ]
        },
      ]
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

      <h2>TreeView</h2>
      <p>Basic TreeView.</p>
      <TreeView
        style={{ width: '300px' }}
        data={simpleTreeData}
        children={(data, position) => data['children']}
        display={(data, position) => data['header']}
        expanded={(data, position) => this.state.treeView1ExpandedNodes.includes(position.join(','))}
        itemHandleClick={(data, position) => this.setState({ ...this.state, treeView1ExpandedNodes: toggleArrayElement(this.state.treeView1ExpandedNodes, position.join(',')) })}
      />
    </div>
    );
  }
}
