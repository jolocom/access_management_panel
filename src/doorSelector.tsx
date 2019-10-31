import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { GraphComponent } from './graph';
import { FileGraph, Door } from './graphLib';

interface IProps {
    graph: FileGraph
    onSelectionFinished: (selection: string[]) => void
}

export const DoorSelector: React.FC<IProps>= (props: IProps) => {
    const [selection, setSelection] = useState<string[]>([])

    return (
        <div>
            <GraphComponent graph={props.graph} onLinkClicked={({id}) => setSelection(
                selection.some(s => id === s)
                    ? selection.filter(s => s !== id)
                    : [...selection, id]
            )}/>
            <Button onClick={() => props.onSelectionFinished(selection)}>henlo</Button>
        </div>
    )
}
