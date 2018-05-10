import * as React from 'react';
import { CommonProps, classNames } from './shared';
import './shared.css';

type TItem = any;
type ListItemContent = string | number | React.Component | JSX.Element;

interface ListViewProps extends CommonProps {
  items: TItem[];
  display: (item: TItem, i: number) => ListItemContent;
  tooltip?: (item: TItem, i: number) => string;
  itemClass?: (item: TItem, i: number) => string;
  checked?: (item: TItem, i: number) => boolean;
  selected: (item: TItem, i: number) => boolean;
  itemClick?: (item: TItem, i: number) => void;
}

const ListView = ({ id, cls, style, items, display, tooltip, itemClass, selected, itemClick }: ListViewProps) => {
  return (
    <ul
      id={id}
      className={classNames(cls, 'list-group')}
      style={{ ...style, userSelect: 'none', overflowY: 'scroll' }}
    >
      {items.map((item, i) =>
        <li
          key={i}
          className={classNames(itemClass ? itemClass(item, i) : '', 'list-group-item', { 'active': selected(item, i) })}
          title={tooltip ? tooltip(item, i) : undefined}
          onClick={() => itemClick && itemClick(item, i)}
        >
          {display(item, i)}
        </li>)}
    </ul>
  );
};

export default ListView;
