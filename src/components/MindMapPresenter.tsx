import * as React from 'react';
import { NodeSpec } from '../core';
import { Node, MindMap } from '../core';

interface MindMapPresenterProps {
  specObject: NodeSpec;
}

const MindMapPresenter = (props: MindMapPresenterProps) => {
  const mindMap = new MindMap(Node.fromSpecObject(props.specObject));

  return (
    <div dangerouslySetInnerHTML={{ __html: mindMap.toSvgString() }}></div>
  );
};

export default MindMapPresenter;
