import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BoxPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.modeOfInvestment))
      .range([0, width])
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.annualIncome)])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.modeOfInvestment) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.annualIncome))
      .attr("r", 5)
      .attr("fill", "#69b3a2");
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BoxPlot;
