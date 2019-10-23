// A Room has a name
type Room = {
    name: string,
    doors: Door[]
}

export type NaiveRoom = {
    name: string,
    id: number
}

// A Door is a pair of rooms with an id
type Door = {
    id: string,
    rooms: [Room, Room]
}

export type NaiveDoor = {
    source: number,
    target: number,
    id?: string
}

// A Naive Graph is an object with naive door and rooms read from a file
export type NaiveGraph = {
    nodes: NaiveRoom[],
    links: NaiveDoor[]
}

