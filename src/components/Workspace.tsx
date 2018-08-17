import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { NodeSpec as MindMapNodeSpec, getNodeDict, getParentDict } from '../core';
import { CTreeView } from '../widgets/treeview';
import { CViewer } from '../widgets/viewer';
import { InputDialog } from '../widgets/dialog';
import MindMapPresenter from './MindMapPresenter';
import '../css/workspace.css';

interface WorkspaceProps {

}

// {"content":"Root","children":[{"content":"Children 1","children":[{"content":"Children 4"},{"content":"Children 5"}]},{"content":"Children 2"},{"content":"Children 3"}]}
interface WorkspaceState {
  mindMapSpec: NodeSpec;
  selectedNode?: NodeSpec;
  isEditingNode: boolean;
  editNodeValue: string;
}

interface NodeSpec extends MindMapNodeSpec {
  children?: NodeSpec[];
  collapsed?: boolean;
}

export default class Workspace extends React.Component<RouteComponentProps<WorkspaceProps>, WorkspaceState> {

  tempData: any;

  constructor(props: RouteComponentProps<WorkspaceProps>) {
    super(props);

    this.tempData = {};

    this.state = {
      mindMapSpec: {
        content: 'Root'
      },
      isEditingNode: false,
      editNodeValue: ''
    };

    this.inputChanged = this.inputChanged.bind(this);
    this.viewerClick = this.viewerClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.editNode = this.editNode.bind(this);
    this.doneEditingNode = this.doneEditingNode.bind(this);
    this.cancelEditingNode = this.cancelEditingNode.bind(this);
  }

  inputChanged(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const input = e.target.value;
    let spec = this.state.mindMapSpec;
    try {
      spec = JSON.parse(input);
    } catch {
      return;
    }

    this.setState({
      ...this.state,
      mindMapSpec: spec,
      selectedNode: spec
    });
  }

  viewerClick(e: React.MouseEvent<any>) {
    if (e.target instanceof SVGRectElement) {
      const spec = getNodeDict()[e.target.id];
      this.selectNode(spec);
    } else if (e.target instanceof SVGTextElement) {
      const spec = getNodeDict()[e.target.id.replace('-text', '')];
      this.selectNode(spec);
    } else {
      this.selectNode();
    }
  }

  selectNode(newNode?: NodeSpec) {
    if (this.state.selectedNode) {
      delete this.state.selectedNode.cls;
    }

    if (newNode) {
      newNode.cls = ['active'];
    }

    this.setState({
      ...this.state,
      mindMapSpec: this.state.mindMapSpec,
      selectedNode: newNode
    });
  }

  onKeyDown(event: React.KeyboardEvent<any>) {
    if (event.key === 'Enter') {
      if (this.state.selectedNode) {
        const current = this.state.selectedNode;
        const parent = getParentDict().get(current);
        if (parent) {
          const siblings = parent.children as MindMapNodeSpec[];
          const index = siblings.indexOf(current);
          parent.children = [
            ...siblings.slice(0, index + 1),
            { content: 'New node' },
            ...siblings.slice(index + 1, siblings.length),
          ];
        } else {
          current.children = [
            ...(current.children || []),
            { content: 'New node' }
          ];
        }

        this.setState(this.state);
      }
    } else if (event.key === 'Tab') {
      if (this.state.selectedNode) {
        this.state.selectedNode.children = [
          ...(this.state.selectedNode.children || []),
          { content: 'New node' }
        ];
        this.setState(this.state);
      }
    } else if (event.key === ' ') {
      if (this.state.selectedNode) {
        this.setState({
          ...this.state,
          isEditingNode: true,
          editNodeValue: this.state.selectedNode.content
        });
      }
    }

    event.preventDefault();
  }

  editNode(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      editNodeValue: event.target.value
    });
  }

  doneEditingNode() {
    if (this.state.editNodeValue) {
      (this.state.selectedNode as NodeSpec).content = this.state.editNodeValue;
    }

    this.setState({
      ...this.state,
      isEditingNode: false
    });
  }

  cancelEditingNode() {
    this.setState({
      ...this.state,
      isEditingNode: false
    });
  }

  public render() {
    return (
    <div>
      <h1>Workspace</h1>
      <p>Welcome to your mind map workspace.</p>

      <div className="row">
        <div className="col-md-3">
          <div className="workspace-sidebar">
            <textarea
              className="form-control"
              rows={10}
              value={JSON.stringify(this.state.mindMapSpec)}
              onChange={this.inputChanged}
            >
            </textarea>

            <CTreeView
              style={{ width: '300px' }}
              data={this.state.mindMapSpec}
              items={(data, position) => data['children']}
              display={(data, position) => data['content']}
              expanded={(data, position) => !data.collapsed}
              selected={(data, position) => data === this.state.selectedNode}
              onSelectionChanged={(data, position) => this.selectNode(data)}
              onExpansionChanged={(data, position, expanded) => data.collapsed = !expanded}
              onKeyDown={this.onKeyDown}
            />
          </div>
        </div>
        <div className="col-md-9">
          <CViewer
            width={800}
            height={600}
            style={{ border: '1px solid silver' }}
            onKeyDown={this.onKeyDown}
          >
            <MindMapPresenter
              specObject={this.state.mindMapSpec}
              onClick={this.viewerClick}
            />
          </CViewer>
        </div>
      </div>

      <InputDialog
        title="Edit node"
        isOpen={this.state.isEditingNode}
        value={this.state.editNodeValue}
        onChange={this.editNode}
        onOk={this.doneEditingNode}
        onClose={this.cancelEditingNode}
      >
      </InputDialog>
    </div>
    );
  }
}
