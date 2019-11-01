import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { GraphRenderer } from './graph';
import { FileGraph } from './graphLib';

interface IProps {
    graph: FileGraph
    onSelectionFinished: (selection: string[]) => void
}

interface IState {
    selection: string[]
}

export class DoorSelector extends React.Component<IProps, IState> {
    onFinish: (selection: string[]) => void;
    readonly graph: FileGraph
    
    constructor(props: IProps) {
        super(props);
        this.graph = props.graph
        this.onFinish = props.onSelectionFinished
        this.state = { selection: [] }
    }

    render() {
        return (
        <div>
                <GraphRenderer graph={this.graph} style={{width: 400, height: 200}} onLinkClicked={id => {
                    if (this.state.selection.includes(id)) this.setState({ selection: this.state.selection.filter(s => s !== id) })
                    else this.setState({ selection: [...this.state.selection, id] })
                }}/>
                <Button onClick={() => this.onFinish(this.state.selection)}>issue</Button>
                <p>{this.state.selection}</p>
        </div>
        )
    }
}
