import React, { FC } from 'react';
import styles from './PieSvgComponent.module.css';
import * as d3 from "d3";
interface PieSvgComponentProps { data: any; width: number; height: number; innerRadius: number; outerRadius: number; }

const PieSvgComponent: FC<PieSvgComponentProps> = (props: any) => {

  const Arc = ({ data, index, createArc, colors, format }:any) => {
    return (
    
      <g key={index} className="arc">
        <path className="arc" d={createArc(data)} fill={colors(index)} />
        <text
          transform={`translate(${createArc.centroid(data)})`}
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
          fontSize="10"
        >
          {data.data.label+"\n ("+data.value+")"}
        </text>
      </g>
    )
  };

  const createPie = d3
      .pie()
      .value((d:any) => d.value)
      .sort(null);
    const createArc = d3
      .arc()
      .innerRadius(props.innerRadius)
      .outerRadius(props.outerRadius);
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const format = d3.format(".2f");
    const data = createPie(props.data);
    return (
      <div className={styles.PieSvgComponent} data-testid="PieSvgComponent">
      <svg width={props.width} height={props.height}>
        <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
          
          {data && data.map((d: any, i: any) => (
            <Arc
              key={i}
              data={d}
              index={i}
              createArc={createArc}
              colors={colors}
              format={format}
            />
          ))}
        </g>
      </svg>
      </div>
    );

}
export default PieSvgComponent;
