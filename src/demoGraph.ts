import { FileGraph } from './graphLib'


export const graph: FileGraph = {
    rooms: [
        {
            id: "1",
            name: "A"
        },
        {
            id: "2",
            name: "B"
        },
        {
            id: "3",
            name: "C"
        },
        {
            id: "4",
            name: "D"
        },
        {
            id: "5",
            name: "E"
        },
        {
            id: "6",
            name: "F"
        },
        {
            id: "7",
            name: "G"
        },
        {
            id: "8",
            name: "H"
        },
        {
            id: "9",
            name: "I"
        },
        {
            id: "0",
            name: "J"
        }
    ],
    doors: [
        {
            id: "1",
            source: "1",
            target: "2"
        },
        {
            id: "2",
            source: "1",
            target: "5"
        },
        {
            id: "3",
            source: "1",
            target: "6"
        },
        {
            id: "4",
            source: "2",
            target: "3"
        },
        {
            id: "5",
            source: "2",
            target: "7"
        },
        {
            id: "6",
            source: "3",
            target: "4"
        },
        {
            id: "7",
            source: "8",
            target: "3"
        },
        {
            id: "8",
            source: "4",
            target: "5"
        },
        {
            id: "9",
            source: "4",
            target: "9"
        },
        {
            id: "0",
            source: "5",
            target: "0"
        }
    ]
}
