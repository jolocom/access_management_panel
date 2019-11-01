import React from 'react';
import { Button } from '@acpaas-ui/react-components';
import { GraphRenderer } from './graph';
import { FileGraph } from './graphLib';

interface IProps {
    graph: FileGraph
    onSelectionFinished: (selection: string[]) => void
    style: {
        width: number,
        height: number
    }
}

interface IState {
    selection: string[]
}

export class DoorSelector extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { selection: [] }
    }

    render() {
        return (
            <div>
                <GraphRenderer graph={this.props.graph} style={this.props.style} onLinkClicked={id => {
                    if (this.state.selection.includes(id)) this.setState({ selection: this.state.selection.filter(s => s !== id) })
                    else this.setState({ selection: [...this.state.selection, id] })
                }} />
                <Button onClick={() => this.props.onSelectionFinished(this.state.selection)}>issue</Button>
                <p>{this.state.selection}</p>
            </div>
        )
    }
}
