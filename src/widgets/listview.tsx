import * as React from 'react';
import { CommonProps } from './shared';

type TItem = any;
type ListItemContent = string | React.Component;

interface ListViewProps extends CommonProps {
  items: TItem[];
  display: (item: TItem) => ListItemContent;
  tooltip?: (item: TItem) => string;
  icon?: (item: TItem) => string;
  checked?: (item: TItem) => boolean;
  selected: (item: TItem) => boolean;
  itemClick?: (item: TItem) => void;
}

const ListView = ({ id, classNames, style, items, display, tooltip, selected }: ListViewProps) => {
  const ulStyle = {
    userSelect: 'none',
  };

  return (
    <ul
      id={id}
      className={[...classNames || [], 'list-group'].join(' ')}
      style={Object.assign(ulStyle, style)}
    >
      {items.map(item =>
        <li
          key={item}
          className={'list-group-item' + (selected(item) ? ' active' : '')}
          title={tooltip ? tooltip(item) : undefined}
        >
          {display(item)}
        </li>)}
    </ul>
  );
};

export default ListView;
