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
  onMouseDown?: React.MouseEventHandler<any>;
  onMouseUp?: React.MouseEventHandler<any>;
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
      style={{ ...props.style, width: props.width, height: props.height, overflow: 'hidden' }}
      onMouseMove={props.onMouseMove}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onWheel={props.onWheel}
    >
      <div
        id={props.id + '-content'}
        className="viewer-content"
        style={{ transform: `translate(${props.origin.x}, ${props.origin.y}) scale(${props.scale})` }}
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

      this.tempData.previousPageX = e.pageX;
      this.tempData.previousPageY = e.pageY;
    }
  }

  updateScale(e: React.WheelEvent<any>) {
    this.setState({
      ...this.state,
      scale: e.deltaY > 0 ? 2 * this.state.scale : e.deltaY < 0 ? 0.5 * this.state.scale : this.state.scale
    });

    e.stopPropagation();
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
      onMouseDown={(e) => { this.tempData.previousPageX = e.pageX; this.tempData.previousPageY = e.pageY; }}
      onMouseUp={(e) => { this.tempData.previousPageX = null; this.tempData.previousPageY = null; }}
      onWheel={this.updateScale}
    >
      {this.props.children}
    </PViewer>
    );
  }
}
