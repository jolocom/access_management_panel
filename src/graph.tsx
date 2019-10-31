import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { FileGraph, Door, Room } from './graphLib';

type Node = Room & d3.SimulationNodeDatum

type Link = Door & d3.SimulationLinkDatum<Node>

type Graph = {
    nodes: Node[]
    links: Link[]
}

interface IProps {
    graph: FileGraph;
    onLinkClicked: (link: Door) => void
}

const g2d = (g: FileGraph): Graph => ({
    nodes: g.rooms,
    links: g.doors
})

export const GraphComponent = (props: IProps) => {
    /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
    const d3Container = useRef<SVGSVGElement>(null);

    const width = 400;
    const height = 200;

    let graph = g2d(props.graph)

    const simulation = d3.forceSimulation(graph.nodes)
        // make nodes repel eachother
        .force('charge', d3.forceManyBody().strength(-80))
        // make links bring nodes together
        .force('link', d3.forceLink(graph.links).distance(20).strength(1))
        // attract nodes to the center of the view so they stay visible
        .force('center', d3.forceCenter(width / 2, height / 2))
        // stop the simulation from running automatically
        .stop()

    // run the simulation for 300 ticks to stabalise the shape of the graph
    simulation.tick(300)

    /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
    useEffect(
        () => {
            if (d3Container.current) {
                const svg = d3.select(d3Container.current)

                // Bind D3 data
                const nodeElements = svg.append('g')
                    .selectAll('circle')
                    .data(graph.nodes)
                    .enter()
                    .append('circle')
                    .attr('r', 10)
                    .attr('fill', 'red')
                    .attr('cx', (d: any) => d.x)
                    .attr('cy', (d: any) => d.y)

                nodeElements.append('title')
                    .text(d => d.name)
                    .attr('cx', (d: any) => d.x)
                    .attr('cy', (d: any) => d.y)

                const linkElements = svg.append('g')
                    .selectAll('line')
                    .data(graph.links)
                    .enter()
                    .append('line')
                    .attr('stroke-width', 2)
                    .attr('stroke', 'blue')
                    .attr('x1', (d: any) => d.source.x)
                    .attr('x2', (d: any) => d.target.x)
                    .attr('y1', (d: any) => d.source.y)
                    .attr('y2', (d: any) => d.target.y)
                    .on('click', d => props.onLinkClicked(d))
            }
        },
        /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
        [d3Container.current]
    )

    return (
        <svg
            className="d3-component"
            width={width}
            height={height}
            ref={d3Container}
        />
    )
}

