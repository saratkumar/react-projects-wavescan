import React, { FC, useEffect, useRef } from 'react';
import styles from './BarSvgComponent.module.css';
import {
  axisBottom,
  axisLeft,
  ScaleBand,
  scaleBand,
  ScaleLinear,
  scaleLinear,
  select
} from "d3";
import { AxisBottomProps, AxisLeftProps, BarsProps, BarSvgComponentProps } from '../../models/chart.interface';




function AxisBottom({ scale, transform }: AxisBottomProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}

function AxisLeft({ scale }: AxisLeftProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} />;
}

function Bars({ data, height, scaleX, scaleY }: BarsProps) {
  return (
    <>
      {data && data.map(({ value, label }) => (
        <rect
          key={`bar-${label}`}
          x={scaleX(label)}
          y={scaleY(value)}
          width={scaleX.bandwidth()}
          height={height - scaleY(value)}
          fill="teal"
        />
      ))}
    </>
  );
}

const BarSvgComponent: FC<BarSvgComponentProps> = ({data}: any) => {
    const margin = { top: 10, right: 0, bottom: 20, left: 30 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
  
    const scaleX = scaleBand()
      .domain(data.map(({ label }: any) => label))
      .range([0, width])
      .padding(0.5);
    const scaleY = scaleLinear()
      .domain([0, Math.max(...data.map(({ value } : any) => value))])
      .range([height, 0]);
  
    return (
      <div className={styles.BarSvgComponent} data-testid="BarSvgComponent">
    <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
          <AxisLeft scale={scaleY} />
          <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
        </g>
      </svg>
  </div>
      
    
  );
} 
export default BarSvgComponent;

