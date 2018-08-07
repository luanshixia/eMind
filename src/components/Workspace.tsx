import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { NodeSpec } from '../core';
import { CTreeView } from '../widgets/treeview';
import '../css/workspace.css';

interface WorkspaceProps {

}

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

        </div>
      </div>
    </div>
    );
  }
}
