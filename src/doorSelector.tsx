import React from 'react';
import { Button } from 'react-bootstrap';
import { GraphComponent } from './graph';
import { FileGraph, Door } from './graphLib';

interface IProps {
    graph: FileGraph
    onSelectionFinished: (selection: Door[]) => void
}

export const DoorSelector: React.FC<IProps>= (props: IProps) => {
    return (
        <div>
            <GraphComponent graph={props.graph} onLinkClicked={console.log}/>
            <Button onClick={() => console.log("h")}>henlo</Button>
        </div>
    )
}
