
// A Room has a name
type Room = {
    name: string,
    doors: Door[]
}

type NaiveRoom = {
    name: string,
    id: number
}

// A Door is a pair of rooms with an id
type Door = {
    id: string,
    rooms: [Room, Room]
}

type NaiveDoor = {
    source: string,
    target: string,
    id?: string
}

// A Naive Graph is an object with naive door and rooms read from a file
type NaiveGraph = {
    nodes: NaiveRoom[],
    links: NaiveDoor[]
}

