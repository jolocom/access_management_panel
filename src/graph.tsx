import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Graph } from './graphLib';

interface IProps {
    graph: Graph;
}

/* Component */
export const D3Component = (props: IProps) => {
    /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
    const d3Container = useRef(null);

    const width = 400;
    const height = 200;

    /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
    useEffect(
        () => {
            if (props.data && d3Container.current) {
                const { nodes, links } = props.data

                const svg = d3.select(d3Container.current);
                
                const simulation = d3.forceSimulation()
                    // make nodes repel eachother
                    .force('charge', d3.forceManyBody().strength(-20))
                    // attract nodes to the center of the view so they stay visible
                    .force('center', d3.forceCenter(width / 2, height / 2))

                // Bind D3 data
                const nodeElements = svg.append('g')
                    .selectAll('circle')
                    .data(nodes)
                    .enter()
                    .append('circle')
                    .attr('r', 10)
                    .attr('fill', 'red')

                const labelElements = svg.append('g')
                    .selectAll('text')
                    .data(nodes)
                    .enter()
                    .append('text')
                    .text(node => node.name)
                    .attr('font-size', 15)
                    .attr('dx', 15)
                    .attr('dy', 4)

                const linkElements = svg.append('g')
                    .selectAll('line')
                    .data(links)
                    .enter()
                    .append('line')
                    .attr('stroke-width', 1)
                    .attr('stroke', 'blue')

                // define what happends on each tick of the simulation
                simulation.nodes(nodes).on('tick', () => {
                    // update the the x and y values for the node elements
                    nodeElements
                        .attr('cx', node => node.x)
                        .attr('cy', node => node.y)

                    // set the x and y for the labels to their nodes
                    labelElements
                        .attr('x', node => node.x)
                        .attr('y', node => node.y)
                })

            }
        },

        /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
        [props.data, d3Container.current])

    return (
        <svg
            className="d3-component"
            width={width}
            height={height}
            ref={d3Container}
        />
    );
}
