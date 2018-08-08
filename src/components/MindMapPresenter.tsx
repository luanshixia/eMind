import * as React from 'react';
import { NodeSpec } from '../core';
import { Node, MindMap } from '../core';

interface MindMapPresenterProps {
  specObject: NodeSpec;
  onClick?: (e: React.MouseEvent<any>) => void;
}

const MindMapPresenter = (props: MindMapPresenterProps) => {
  const mindMap = new MindMap(Node.fromSpecObject(props.specObject));

  return (
    <div
      dangerouslySetInnerHTML={{ __html: mindMap.toSvgString() }}
      onClick={props.onClick}
    >
    </div>
  );
};

export default MindMapPresenter;
