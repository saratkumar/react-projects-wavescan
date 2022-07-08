import {
    ScaleBand,
    ScaleLinear,
} from "d3";
export interface AxisBottomProps {
    scale: ScaleBand<string>;
    transform: string;
}
export interface AxisLeftProps {
    scale: ScaleLinear<number, number, never>;
}

export interface BarSvgComponentProps { data: IData[] }
export interface BarsProps {
    data: BarSvgComponentProps["data"];
    height: number;
    scaleX: AxisBottomProps["scale"];
    scaleY: AxisLeftProps["scale"];
}
export interface IData {
    label: string;
    value: number;
}

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }