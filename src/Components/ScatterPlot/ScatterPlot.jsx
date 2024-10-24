import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ScatterPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.age), d3.max(data, (d) => d.age)])
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.investmentPerMonth)])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.age))
      .attr("cy", (d) => y(d.investmentPerMonth))
      .attr("r", 5)
      .attr("fill", "#69b3a2");
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlot;
