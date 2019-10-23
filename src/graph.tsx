import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { NaiveDoor, NaiveRoom, NaiveGraph } from './graphLib';
import * as demo from './demo.json';

interface IProps {
    data?: number[];
}

const getLinks = (svg: d3.Selection<null, unknown, null, undefined>) => (links: NaiveDoor[]) => svg
    .selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .style('stroke', "#aaa")

const getNodes = (svg: d3.Selection<null, unknown, null, undefined>) => (nodes: NaiveRoom[]) => svg
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .style('fill', '#69b3a2')

/* Component */
export const D3Component = (props: IProps) => {
    /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
    const d3Container = useRef(null);

    /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
    useEffect(
        () => {
            if (props.data && d3Container.current) {
                const svg = d3.select(d3Container.current);

                // Bind D3 data
                const links = getLinks(svg)(demo.links)
                const nodes = getNodes(svg)(demo.nodes)

                // Update existing D3 elements
                // update
                    // .attr('x', (d, i) => i * 40)
                    // .text((d: number) => d);

                // Remove old D3 elements
                // update.exit()
                    // .remove();
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
            width={400}
            height={200}
            ref={d3Container}
        />
    );
}
