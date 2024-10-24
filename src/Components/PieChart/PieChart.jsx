import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.count);
    const data_ready = pie(data);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg
      .selectAll("pieces")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.motivationCause))
      .style("opacity", 0.7);

    svg
      .selectAll("labels")
      .data(data_ready)
      .enter()
      .append("text")
      .text((d) => d.data.motivationCause)
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", "10px");
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default PieChart;
