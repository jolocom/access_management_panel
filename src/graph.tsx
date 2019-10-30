import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { NaiveDoor, NaiveRoom, NaiveGraph } from './graphLib';
import { forceManyBody } from 'd3';

interface IProps {
    data?: NaiveGraph;
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
                console.log(props.data)
                const svg = d3.select(d3Container.current);

                // Bind D3 data
                const nodes = svg.append('g')
                    .selectAll('circle')
                    .data(props.data.nodes)
                    .enter()
                    .append('circle')
                    .attr('r', 10)
                    .attr('fill', 'red')

                const labels = svg.append('g')
                    .selectAll('text')
                    .data(props.data.nodes)
                    .enter()
                    .append('text')
                    .text(node => node.name)
                    .attr('font-size', 15)
                    .attr('dx', 15)
                    .attr('dy', 4)

                const links = svg.append('g')
                    .selectAll('line')
                    .data(props.data.links)
                    .enter()
                    .append('line')
                    .attr('stroke-width', 1)
                    .attr('stroke', 'blue')
                
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
