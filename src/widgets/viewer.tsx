import * as React from 'react';
import { CommonProps, classNames, toggleArrayElement } from './shared';
import './shared.css';

interface Point2D {
  x: number;
  y: number;
}

interface PViewerProps extends CommonProps {
  origin: Point2D;
  scale: number;
  width: number;
  height: number;
  onMouseMove?: React.MouseEventHandler<any>;
  // onMouseDown?: React.MouseEventHandler<any>;
  // onMouseUp?: React.MouseEventHandler<any>;
  onWheel?: React.WheelEventHandler<any>;
}

interface CViewerProps extends CommonProps {
  initialOrigin?: Point2D;
  initialScale?: number;
  width: number;
  height: number;
}

interface CViewerState {
  origin: Point2D;
  scale: number;
}

export const PViewer = (props: PViewerProps) => {
  return (
    <div
      id={props.id}
      className="viewer viewer-border"
      style={{ ...props.style, width: props.width, height: props.height, overflow: 'hidden', userSelect: 'none' }}
      onMouseMove={props.onMouseMove}
      // onMouseDown={props.onMouseDown}
      // onMouseUp={props.onMouseUp}
      onWheel={props.onWheel}
    >
      <div
        id={props.id + '-content'}
        className="viewer-content"
        style={{ transform: `translate(${Math.trunc(props.origin.x)}px, ${Math.trunc(props.origin.y)}px) scale(${props.scale})`, transformOrigin: '0 0' }}
        onDragStart={e => e.preventDefault()}
      >
        {props.children}
      </div>
    </div>
  );
};

export class CViewer extends React.Component<CViewerProps, CViewerState> {

  tempData: any;

  constructor(props: CViewerProps) {
    super(props);

    this.tempData = {
      previousPageX: null,
      previousPageY: null
    };

    this.state = {
      origin: props.initialOrigin || { x: 0, y: 0},
      scale: props.initialScale || 1
    };

    this.updateOrigin = this.updateOrigin.bind(this);
    this.updateScale = this.updateScale.bind(this);
  }

  updateOrigin(e: React.MouseEvent<any>) {
    if (e.buttons === 1) {
      this.setState({
        ...this.state,
        origin: {
          x: this.state.origin.x + (e.pageX - this.tempData.previousPageX),
          y: this.state.origin.y + (e.pageY - this.tempData.previousPageY)
        }
      });
    }

    this.tempData.previousPageX = e.pageX;
    this.tempData.previousPageY = e.pageY;
  }

  updateScale(e: React.WheelEvent<any>) {
    const borderElement = e.target as HTMLElement;
    const rect = borderElement.getBoundingClientRect();

    const basePoint = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const newScale = e.deltaY < 0 ? 2 * this.state.scale : e.deltaY > 0 ? 0.5 * this.state.scale : this.state.scale;
    const v1 = { x: basePoint.x - this.state.origin.x, y: basePoint.y - this.state.origin.y };
    const v2 = { x: (this.state.scale / newScale) * v1.x, y: (this.state.scale / newScale) * v1.y  };

    this.setState({
      // ...this.state,
      origin: { x: this.state.origin.x + v1.x - v2.x, y: this.state.origin.y + v1.y - v2.y },
      scale: newScale
    });

    e.preventDefault();
  }

  render() {
    return (
    <PViewer
      id={this.props.id}
      cls={this.props.cls}
      style={this.props.style}
      origin={this.state.origin}
      scale={this.state.scale}
      width={this.props.width}
      height={this.props.height}
      onMouseMove={this.updateOrigin}
      onWheel={this.updateScale}
    >
      {this.props.children}
    </PViewer>
    );
  }
}
