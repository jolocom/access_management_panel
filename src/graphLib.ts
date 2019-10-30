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

