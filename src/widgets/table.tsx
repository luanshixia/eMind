import * as React from 'react';
import { CommonProps, classNames } from './shared';
import './shared.css';

type TRow = any;
type TableCellContent = string | number | React.Component | JSX.Element;

interface TableProps extends CommonProps {
  rows: TRow[];
  rowClass?: (row: TRow, i: number) => string;
  cellClick?: (row: TRow, i: number, j: number) => void;
  showHeader?: boolean;
  headerRowClass?: string;
  children: any[];
}

interface TableColumnProps extends CommonProps {
  width?: string;
  header?: TableCellContent;
  headerCellClass?: string;
  cellClass?: (row: TRow, i: number) => string;
  display: (row: TRow, i: number) => TableCellContent;
  tooltip?: (row: TRow, i: number) => string;
}

export const Table = ({ id, cls, style, children, rows, rowClass, cellClick, showHeader, headerRowClass }: TableProps) => {
  const columns = children || [];
  return (
    <table
      id={id}
      className={classNames(cls, 'table')}
      style={{ ...style, userSelect: 'none', overflowY: 'scroll' }}
    >
      <colgroup>
        {columns.map((col, j) =>
          <col
            key={j}
            width={col.props.width}
          >
          </col>)}
      </colgroup>
      {showHeader &&
        <thead>
          <tr
            className={classNames(headerRowClass, 'table-row')}
          >
            {columns.map((col, j) =>
              <td
                key={j}
                className={classNames(col.props.headerCellClass, 'table-cell')}
              >
                {col.props.header}
              </td>)}
          </tr>)}
        </thead>
      }
      <tbody>
      {rows.map((row, i) =>
        <tr
          key={i}
          className={classNames(rowClass ? rowClass(row, i) : '', 'table-row')}
        >
          {columns.map((col, j) =>
            <td
              key={j}
              className={classNames(col.props.cellClass ? col.props.cellClass(row, i) : '', 'table-cell')}
              title={col.props.tooltip ? col.props.tooltip(row, i) : undefined}
            >
              {col.props.display(row, i)}
            </td>)}
        </tr>)}
      </tbody>
    </table>
  );
};

export const Column = ({ header, cellClass, display, tooltip, width }: TableColumnProps) => {
  return null;
};
