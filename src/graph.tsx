import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3'
import { Graph, Node, Link } from './graphLib';

type d3Graph<N extends Node, L extends Link> = Graph<
    N & d3.SimulationNodeDatum,
L & d3.SimulationLinkDatum<N & d3.SimulationNodeDatum>
>

interface IProps<N extends Node, L extends Link> {
    graph: Graph<N, L>;
    onLinkClicked: (link: L) => void
    onNodeClicked: (node: N) => void
    style: {
        width: number,
        height: number
    }
}

const g2d = <N extends Node, L extends Link>(g: Graph<N, L>): d3Graph<N, L> => ({
    nodes: g.nodes,
    links: g.links
})

const getPositions = <N extends Node, L extends Link>(
    g: Graph<N, L>,
    width: number,
    height: number
): d3Graph<N, L> => {

    let graph = g2d(g)

    const sim = d3.forceSimulation(graph.nodes)
    // make nodes repel eachother
        .force('charge', d3.forceManyBody().strength(-80))
    // make links bring nodes together
        .force('link', d3.forceLink(graph.links).distance(20).strength(1))
    // attract nodes to the center of the view so they stay visible
        .force('center', d3.forceCenter(width / 2, height / 2))
    // stop the simulation from running automatically
        .stop()

    console.log('simulate')
    // run the simulation for 300 ticks to stabalise the shape of the graph
    sim.tick(100)

    return graph;
}

export const ClickableGraph = <N extends Node, L extends Link>(
    props: IProps<N, L>
) => {
    /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
    const d3Container = useRef<SVGSVGElement>(null);
    const rendered = useRef(false);
    /* The useEffect Hook is for running side effects outside of React,

       for instance inserting elements into the DOM using D3 */
    /* D3 operates on an SVG reference which can only be gotten by rendering an
       SVG element and selecting it's reference */
    useEffect(
        () => {
            if (!rendered.current && d3Container.current) {
                const graph = getPositions(props.graph, props.style.width, props.style.height)
                console.log('render')
                const { nodes, links } = graph

                const svg = d3.select(d3Container.current)

                // Bind D3 data
                const nodeElements = svg.append('g')
                    .selectAll('circle')
                    .data(nodes)
                    .enter()
                    .append('circle')
                    .attr('r', 10)
                    .attr('fill', 'red')
                    .attr('cx', (d: any) => d.x)
                    .attr('cy', (d: any) => d.y)
                    .on('click', props.onNodeClicked)

                nodeElements.append('title')
                    .text(d => d.id)
                    .attr('cx', (d: any) => d.x)
                    .attr('cy', (d: any) => d.y)

                const linkElements = svg.append('g')
                    .selectAll('line')
                    .data(links)
                    .enter()
                    .append('line')
                    .attr('stroke-width', 20)
                    .attr('stroke', 'blue')
                    .attr('x1', (d: any) => d.source.x)
                    .attr('x2', (d: any) => d.target.x)
                    .attr('y1', (d: any) => d.source.y)
                    .attr('y2', (d: any) => d.target.y)
                    .on('click', props.onLinkClicked)

                rendered.current = true
            }
        },
        /*
          useEffect has a dependency array (below). It's a list of dependency
          variables for this useEffect block. The block will run after mount
          and whenever any of these variables change. We still have to check
          if the variables are valid, but we do not have to compare old props
          to next props to decide whether to rerender.
        */
        [props]
    )

    return (
            <svg
        className="d3-component"
        width={props.style.width}
        height={props.style.height}
        ref={d3Container}
            />
    )
}
