import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data, resources = false }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 90, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(
        data.map((d) => (resources ? d.resourcesUsed : d.modeOfInvestment))
      )
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
      .domain([0, d3.max(data, (d) => d.count)])
      .nice()
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(resources ? d.resourcesUsed : d.modeOfInvestment))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", "#69b3a2")
      .style("font-size", "10px");
  }, [data, resources]);

  return <svg ref={svgRef}></svg>;
};

export default BarChart;
