import * as React from 'react';
import { NodeSpec } from '../core';
import { Node, MindMap } from '../core';

interface MindMapPresenterProps {
  specObject: NodeSpec;
  onClick?: (e: React.MouseEvent<any>) => void;
  onGetSvg?: (svg: string) => void;
}

const MindMapPresenter = (props: MindMapPresenterProps) => {
  const mindMap = new MindMap(Node.fromSpecObject(props.specObject));
  const svg = mindMap.toSvgString();

  if (props.onGetSvg) {
    props.onGetSvg(svg);
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
      onClick={props.onClick}
    >
    </div>
  );
};

export default MindMapPresenter;
