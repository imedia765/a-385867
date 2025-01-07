import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const mockCommitData = [
  { date: '2024-01-01', commits: 5 },
  { date: '2024-01-02', commits: 8 },
  { date: '2024-01-03', commits: 12 },
  { date: '2024-01-04', commits: 3 },
  { date: '2024-01-05', commits: 7 },
  { date: '2024-01-06', commits: 10 },
  { date: '2024-01-07', commits: 6 },
];

export const CommitActivityChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up scales
    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height, 0]);

    // Set domains
    x.domain(mockCommitData.map(d => d.date));
    y.domain([0, d3.max(mockCommitData, d => d.commits) || 0]);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Create gradient
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'bar-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', '0')
      .attr('y1', height)
      .attr('x2', '0')
      .attr('y2', '0');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3b82f6');

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#93c5fd');

    // Add bars
    svg.selectAll('.bar')
      .data(mockCommitData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.date) || 0)
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.commits))
      .attr('height', d => height - y(d.commits))
      .style('fill', 'url(#bar-gradient)')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('opacity', 0.8);
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('opacity', 1);
      });

  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commit Activity</CardTitle>
        <CardDescription>Daily commit distribution over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <svg ref={svgRef} className="w-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 600 300"></svg>
        </div>
      </CardContent>
    </Card>
  );
};