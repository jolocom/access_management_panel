// A Room has a name
export type Node = {
    id: string
}

// Link between two nodes
export type Link = {
    source: string
    target: string
}

export type Graph<N extends Node, L extends Link> = {
    nodes: N[]
    links: L[]
}
