import * as React from 'react';
import { CommonProps, classNames, toggleArrayElement, walkTree } from './shared';
import './shared.css';

type TreeData = any;
type TreeItemContent = string | number | React.Component | JSX.Element;

interface PTreeViewProps extends CommonProps {
  data: TreeData;
  items: (item: TreeData, position: number[]) => TreeData[];
  display: (item: TreeData, position: number[]) => TreeItemContent;
  tooltip?: (item: TreeData, position: number[]) => string;
  itemClass?: (item: TreeData, position: number[]) => string;
  expanded: (item: TreeData, position: number[]) => boolean;
  selected?: (item: TreeData, position: number[]) => boolean;
  onItemHandleClick?: (item: TreeData, position: number[]) => void;
  onItemContentClick?: (item: TreeData, position: number[]) => void;
}

interface CTreeViewProps extends CommonProps {
  data: TreeData;
  items: (item: TreeData, position: number[]) => TreeData[];
  display: (item: TreeData, position: number[]) => TreeItemContent;
  tooltip?: (item: TreeData, position: number[]) => string;
  itemClass?: (item: TreeData, position: number[]) => string;
  initiallyExpanded?: (item: TreeData, position: number[]) => boolean;
  initiallySelected?: (item: TreeData, position: number[]) => boolean;
  selected?: (item: TreeData, position: number[]) => boolean;
  onExpansionChanged?: (item: TreeData, position: number[], expanded: boolean) => void;
  onSelectionChanged?: (item: TreeData, position: number[], previousPosition: number[]) => void;
}

interface CTreeViewState {
  expandedNodes: string[];
  selectedNodes: string[];
}

interface TreeItemProps extends PTreeViewProps {
  position: number[];
}

function TreeViewItem(props: TreeItemProps): JSX.Element {
  const itemProps = Object.assign({}, props);
  return (
    <div className="tree-item">
      <div className="tree-item-head">
        <span
          className={classNames(['tree-item-handle', props.expanded(props.data, props.position) ? 'glyphicon glyphicon-menu-down' : 'glyphicon glyphicon-menu-right'])}
          onClick={() => props.onItemHandleClick && props.onItemHandleClick(props.data, props.position)}
        >
        </span>
        <span
          className={classNames(['tree-item-content', props.selected && props.selected(props.data, props.position) ? 'active' : ''])}
          title={props.tooltip ? props.tooltip(props.data, props.position) : undefined}
          onClick={() => props.onItemContentClick && props.onItemContentClick(props.data, props.position)}
        >
          {props.display(props.data, props.position)}
        </span>
      </div>
      {props.items(props.data, props.position) && props.expanded(props.data, props.position) &&
      <div className="tree-item-body">
        {props.items(props.data, props.position).map((item, i) =>
          <TreeViewItem {...itemProps} key={[...props.position, i].join(',')} data={item} position={[...props.position, i]} />)}
      </div>}
    </div>
  );
}

export const PTreeView = (props: PTreeViewProps) => {
  const itemProps = Object.assign({}, props);
  delete itemProps.id;
  delete itemProps.cls;
  delete itemProps.style;
  return (
    <div
      id={props.id}
      className={classNames(props.cls)}
      style={{ ...props.style, userSelect: 'none' }}
    >
      <TreeViewItem {...itemProps} position={[0]} />
    </div>
  );
};

export class CTreeView extends React.Component<CTreeViewProps, CTreeViewState> {
  tempData: any;

  constructor(props: CTreeViewProps) {
    super(props);

    this.state = this.initState();
    this.tempData = {
      data: this.props.data
    };

    this.isExpanded = this.isExpanded.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.itemHandleClick = this.itemHandleClick.bind(this);
    this.itemContentClick = this.itemContentClick.bind(this);
  }

  initState() {
    const expandedNodes: string[] = [];
    const selectedNodes: string[] = [];

    walkTree(this.props.data, [0], this.props.items, (node, pos) => {
      if (this.props.initiallyExpanded && this.props.initiallyExpanded(node, pos)) {
        expandedNodes.push(pos.join(','));
      }

      if (this.props.initiallySelected && this.props.initiallySelected(node, pos)) {
        selectedNodes[0] = pos.join(',');
      }
    // tslint:disable-next-line:align
    }, this.props.initiallyExpanded);

    return { expandedNodes, selectedNodes };
  }

  isExpanded(item: TreeData, position: number[]) {
    return this.state.expandedNodes.includes(position.join(','));
  }

  isSelected(item: TreeData, position: number[]) {
    return this.state.selectedNodes[0] === position.join(',');
  }

  toggleExpansion(position: number[]) {
    const [array, added] = toggleArrayElement(this.state.expandedNodes, position.join(','));
    this.setState({
      ...this.state,
      expandedNodes: array
    });
    return added;
  }

  selectNode(position: number[]) {
    this.setState({
      ...this.state,
      selectedNodes: [position.join(',')]
    });
  }

  itemHandleClick(item: TreeData, position: number[]) {
    const expanded = this.toggleExpansion(position);
    if (this.props.onExpansionChanged) {
      this.props.onExpansionChanged(item, position, expanded);
    }
  }

  itemContentClick(item: TreeData, position: number[]) {
    const selectedNode = this.state.selectedNodes[0];
    const previousPosition = selectedNode ? selectedNode.split(',').map(s => parseInt(s)) : [];
    this.selectNode(position);
    if (this.props.onSelectionChanged) {
      this.props.onSelectionChanged(item, position, previousPosition);
    }
  }

  render() {
    if (this.props.data !== this.tempData.data) {
      this.state = this.initState();
      this.tempData.data = this.props.data;
    } else if (this.props.selected) {
      this.state.selectedNodes.length = 0;
      walkTree(this.props.data, [0], this.props.items, (node, pos) => {
        if (this.props.selected && this.props.selected(node, pos)) {
          this.state.selectedNodes[0] = pos.join(',');
        }
      // tslint:disable-next-line:align
      }, this.isExpanded);
    }

    return (
    <PTreeView
      id={this.props.id}
      cls={this.props.cls}
      style={this.props.style}
      data={this.props.data}
      items={this.props.items}
      display={this.props.display}
      expanded={this.isExpanded}
      selected={this.isSelected}
      onItemHandleClick={this.itemHandleClick}
      onItemContentClick={this.itemContentClick}
    />
    );
  }
}
