import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { NodeSpec, getNodeDict } from '../core';
import { CTreeView } from '../widgets/treeview';
import { CViewer } from '../widgets/viewer';
import MindMapPresenter from './MindMapPresenter';
import '../css/workspace.css';

interface WorkspaceProps {

}

// {"content":"Root","children":[{"content":"Children 1","children":[{"content":"Children 4"},{"content":"Children 5"}]},{"content":"Children 2"},{"content":"Children 3"}]}
interface WorkspaceState {
  mindMapSpec: NodeSpec;
}

export default class Workspace extends React.Component<RouteComponentProps<WorkspaceProps>, WorkspaceState> {
  constructor(props: RouteComponentProps<WorkspaceProps>) {
    super(props);

    this.state = {
      mindMapSpec: {
        content: 'Root'
      }
    };

    this.inputChanged = this.inputChanged.bind(this);
    this.viewerClick = this.viewerClick.bind(this);
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
      mindMapSpec: spec
    });
  }

  viewerClick(e: React.MouseEvent<any>) {
    if (e.target instanceof SVGRectElement) {
      const spec = getNodeDict()[e.target.id];
      spec.cls = ['active'];
      this.setState({
        mindMapSpec: this.state.mindMapSpec
      });
    } else if (e.target instanceof SVGTextElement) {
      const spec = getNodeDict()[e.target.id.replace('-text', '')];
      spec.cls = ['active'];
      this.setState({
        mindMapSpec: this.state.mindMapSpec
      });
    }
  }

  public render() {
    return (
    <div>
      <h1>Workspace</h1>
      <p>Welcome to your mind map workspace.</p>

      <div className="row">
        <div className="col-md-3">
          <div className="workspace-sidebar">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">eMind</h3>
              </div>
              <div className="panel-body">
                <textarea
                  className="form-control"
                  rows={5}
                  value={JSON.stringify(this.state.mindMapSpec)}
                  onChange={this.inputChanged}
                >
                </textarea>

                <CTreeView
                  style={{ width: '300px' }}
                  data={this.state.mindMapSpec}
                  items={(data, position) => data['children']}
                  display={(data, position) => data['content']}
                  initiallyExpanded={(data, position) => true}
                  initiallySelected={(data, position) => position.join(',') === '0'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <CViewer
            width={800}
            height={600}
            style={{ border: '1px solid silver' }}
          >
            <MindMapPresenter
              specObject={this.state.mindMapSpec}
              onClick={this.viewerClick}
            />
          </CViewer>
        </div>
      </div>
    </div>
    );
  }
}
