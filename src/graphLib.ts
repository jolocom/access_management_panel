// A Room has a name
export type Room = {
    name: string
    id: string
}

// A Door has an id
// This type is more concerned with the credentials
export type DoorId = {
    id: string
}

// Link between two nodes
export type Link = {
    source: string
    target: string
}

export type Door = DoorId & Link

// A credential value will just be a list of doors
export type Cred = {
    doors: DoorId[]
}

export type FileGraph = {
    rooms: Room[]
    doors: Door[]
}

// D3 node
export type d3Node = {
    group: number
}

export type d3Link = Link & {
    value: number
}

export const getD3Graph = (file: FileGraph): Graph => ({
    nodes: file.rooms.map(room => ({
        ...room,
        group: 1
    })),
    links: file.doors.map(door => ({
        ...door,
        value: 10
    }))
})

export type d3Door = d3Link & Door
export type d3Room = d3Node & Room

export type Graph = {
    nodes: d3Room[],
    links: d3Door[]
}
