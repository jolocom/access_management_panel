import React from 'react';
import { Button } from 'react-bootstrap';
import { ClickableGraph} from './graph';
import { Graph, Node, Link } from './graphLib'

interface IProps {
    graph: Graph<Node, Link & { id: string }>
    onSelectionFinished: (selection: string[]) => void
    style: {
        width: number,
        height: number
    }
}

interface IState {
    selection: string[]
}

export class LinkSelector extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { selection: [] }
    }

    render() {
        return (
            <div>
                <ClickableGraph graph={this.props.graph} onLinkClicked={link => {
                    if (this.state.selection.includes(link.id)) this.setState({ selection: this.state.selection.filter(s => s !== link.id) })
                    else this.setState({ selection: [...this.state.selection, link.id] })
                }} onNodeClicked={node => console.log(node.id)} style={{
                    graph: this.props.style,
                    node: {
                        radius: 10,
                        color: 'red'
                    },
                    link: {
                        width: 10,
                        color: 'blue',
                        maxLen: 30
                    }
                }} />
                <Button onClick={() => this.props.onSelectionFinished(this.state.selection)}>submit</Button>
                <p>{this.state.selection}</p>
            </div>
        )
    }
}
