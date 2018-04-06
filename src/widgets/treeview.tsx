import * as React from 'react';
import { CommonProps, classNames } from './shared';
import './shared.css';

type TreeData = any;
type TreeItemContent = string | React.Component | JSX.Element;

interface TreeViewProps extends CommonProps {
  data: TreeData;
  children: (item: TreeData, position: number[]) => TreeData[];
  display: (item: TreeData, position: number[]) => TreeItemContent;
  tooltip?: (item: TreeData, position: number[]) => string;
  itemClass?: (item: TreeData, position: number[]) => string;
  expanded: (item: TreeData, position: number[]) => boolean;
  selected?: (item: TreeData, position: number[]) => boolean;
  itemContentClick?: (item: TreeData, position: number[]) => void;
  itemHandleClick?: (item: TreeData, position: number[]) => void;
}

interface TreeItemProps extends TreeViewProps {
  position: number[];
}

function TreeViewItem(props: TreeItemProps): JSX.Element {
  const itemProps = Object.assign({}, props);
  return (
    <div className="tree-item">
      <div className="tree-item-head">
        <span
          className={classNames(['tree-item-handle', props.expanded(props.data, props.position) ? 'glyphicon glyphicon-menu-down' : 'glyphicon glyphicon-menu-right'])}
          onClick={() => props.itemHandleClick && props.itemHandleClick(props.data, props.position)}
        >
        </span>
        <span
          className={classNames(['tree-item-content', props.selected && props.selected(props.data, props.position) ? 'active' : ''])}
          title={props.tooltip ? props.tooltip(props.data, props.position) : undefined}
          onClick={() => props.itemContentClick && props.itemContentClick(props.data, props.position)}
        >
          {props.display(props.data, props.position)}
        </span>
      </div>
      {props.children(props.data, props.position) && props.expanded(props.data, props.position) &&
      <div className="tree-item-body">
        {props.children(props.data, props.position).map((item, i) =>
          <TreeViewItem {...itemProps} key={[...props.position, i].join(',')} data={item} position={[...props.position, i]} />)}
      </div>}
    </div>
  );
}

const TreeView = (props: TreeViewProps) => {
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

export default TreeView;
