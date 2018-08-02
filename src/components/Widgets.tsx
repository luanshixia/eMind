import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toggleArrayElement } from '../widgets/shared';
import ListView from '../widgets/listview';
import { PTreeView, CTreeView } from '../widgets/treeview';
import { Table, Column } from '../widgets/table';
import { CViewer } from '../widgets/viewer';

interface WidgetsState {
  listView1SelectedIndex: number;
  listView2SelectedIndex: number;
  listView3SelectedIndex: number;
  treeView1ExpandedNodes: string[];
  treeView2ExpandedNodes: string[];
  treeView1SelectedNode: string;
  treeView2SelectedNode: string;
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
      treeView2ExpandedNodes: ['0'],
      treeView1SelectedNode: '',
      treeView2SelectedNode: '',
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
      <div className="row">
        <div className="col-md-4">
          <PTreeView
            style={{ width: '300px' }}
            data={simpleTreeData}
            items={(data, position) => data['children']}
            display={(data, position) => data['header']}
            expanded={(data, position) => this.state.treeView1ExpandedNodes.includes(position.join(','))}
            selected={(data, position) => this.state.treeView1SelectedNode === position.join(',')}
            onItemHandleClick={(data, position) => this.setState({ ...this.state, treeView1ExpandedNodes: toggleArrayElement(this.state.treeView1ExpandedNodes, position.join(','))[0] })}
            onItemContentClick={(data, position) => this.setState({ ...this.state, treeView1SelectedNode: position.join(',') })}
          />
        </div>
        <div className="col-md-4">
          <CTreeView
            style={{ width: '300px' }}
            data={simpleTreeData}
            items={(data, position) => data['children']}
            display={(data, position) => data['header']}
            initiallyExpanded={(data, position) => position.length < 2}
            initiallySelected={(data, position) => position.join(',') === '0,0'}
          />
        </div>
      </div>

      <p></p>
      <p>Infinite TreeView.</p>
      <div className="row">
        <div className="col-md-4">
          <PTreeView
            style={{ width: '300px' }}
            data={'Root'}
            items={(data, position) => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            display={(data, position) => 'Hello ' + data}
            expanded={(data, position) => this.state.treeView2ExpandedNodes.includes(position.join(','))}
            selected={(data, position) => this.state.treeView2SelectedNode === position.join(',')}
            onItemHandleClick={(data, position) => this.setState({ ...this.state, treeView2ExpandedNodes: toggleArrayElement(this.state.treeView2ExpandedNodes, position.join(','))[0] })}
            onItemContentClick={(data, position) => this.setState({ ...this.state, treeView2SelectedNode: position.join(',') })}
          />
        </div>
        <div className="col-md-4">
          <CTreeView
            style={{ width: '300px' }}
            data={'Root'}
            items={(data, position) => [1, 2, 3]}
            display={(data, position) => 'Hello ' + data}
            initiallyExpanded={(data, position) => position.length < 3}
            initiallySelected={(data, position) => position.join(',') === '0'}
          />
        </div>
      </div>

      <h2>Table</h2>
      <p>Basic Table.</p>
      <Table
        rows={Array.from(Array(10).keys())}
      >
        <Column header="Number" display={(r, i) => r} />
        <Column header="Square" display={(r, i) => r * r} />
      </Table>

      <h2>Viewer</h2>
      <p>Basic Viewer.</p>
      <CViewer
        width={300}
        height={300}
        style={{ border: '1px solid silver' }}
      >
        <svg width="700" height="350" viewBox="-150 -175 700 350" xmlns="http://www.w3.org/2000/svg"><rect id="6HwUtwPH" x="-50" y="-15" width="100" height="30" rx="5" ry="5" stroke="black" fill="transparent" /><text id="6HwUtwPH-text" x="-40" y="7.5" text-anchor="left" font-size="15">Root</text><rect id="B23erRgK" x="150" y="-55" width="100" height="30" rx="5" ry="5" stroke="black" fill="transparent" /><text id="B23erRgK-text" x="160" y="-32.5" text-anchor="left" font-size="15">Children 1</text><path id="B23erRgK-link" d="M150 -40 C 100 -40, 100 0, 50 0" stroke="black" fill="transparent" /><rect id="ylIkI6uG" x="350" y="-75" width="100" height="30" rx="5" ry="5" stroke="black" fill="transparent" /><text id="ylIkI6uG-text" x="360" y="-52.5" text-anchor="left" font-size="15">Children 4</text><path id="ylIkI6uG-link" d="M350 -60 C 300 -60, 300 -40, 250 -40" stroke="black" fill="transparent" /><rect id="Uu1preSG" x="350" y="-35" width="100" height="30" rx="5" ry="5" stroke="black" fill="transparent" /><text id="Uu1preSG-text" x="360" y="-12.5" text-anchor="left" font-size="15">Children 5</text><path id="Uu1preSG-link" d="M350 -20 C 300 -20, 300 -40, 250 -40" stroke="black" fill="transparent" /><rect id="B6a3jwtz" x="150" y="5" width="100" height="30" rx="5" ry="5" stroke="black" fill="transparent" /><text id="B6a3jwtz-text" x="160" y="27.5" text-anchor="left" font-size="15">Children 2</text><path id="B6a3jwtz-link" d="M150 20 C 100 20, 100 0, 50 0" stroke="black" fill="transparent" /><rect id="rXYKG5OM" x="150" y="45" width="100" height="30" rx="5" ry="5" stroke="black" fill="transparent" /><text id="rXYKG5OM-text" x="160" y="67.5" text-anchor="left" font-size="15">Children 3</text><path id="rXYKG5OM-link" d="M150 60 C 100 60, 100 0, 50 0" stroke="black" fill="transparent" /></svg>
      </CViewer>
    </div>
    );
  }
}
