import Button, { ButtonProps } from '@mui/material/Button';
import React, { FC, useEffect, useState } from 'react';
import styles from './ChartComponent.module.css';
import PieSvgComponent from '../PieSvgComponent/PieSvgComponent';
import BarSvgComponent from '../BarSvgComponent/BarSvgComponent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { range } from 'd3';
import { WaveScanDataResponse } from '../../models/wave-scan.interface';
import {DialogTitleProps, IData} from '../../models/chart.interface';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MaterialChartSwitch, MaterialDataSwitch } from '../../constants/chart.constant';
interface ChartComponentProps {
  chartData: WaveScanDataResponse
}


const BootstrapDialog = styled(Dialog)(({ theme }: any) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
const ChartComponent: FC<ChartComponentProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [chartType, setChartType] = useState(true);
  const [dataType, setDataType] = useState(true);
  const [barChartData, setBarChartData] = useState<IData[]>([])
  const generateData = (valArr?: any, length = 5) =>
    range(valArr ? valArr.length : barChartData.length).map((item, index) => ({
      date: (valArr && valArr.length) ? valArr[index].label : barChartData[index].label,
      value: (valArr && valArr.length) ? valArr[index].value : barChartData[index].value,
    }));
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onChartTypeChange = (ev: any) => {
    setChartType(ev.target.checked);
  }

  const onDataTypeChange = (ev: any) => {
    setDataType(ev.target.checked);
  }

  const ChartComp = () => {

    if (chartType) return <BarSvgComponent data={barChartData} />
    else return <PieSvgComponent data={barChartData} width={400} height={400} innerRadius={120} outerRadius={200} />
  }

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    textDecoration: "underline",
    border: "0px",
    '&:hover': {
      textDecoration: "underline",
      border: "0px",
    },
  }));

  
  useEffect(() => {
    const objProp = dataType ? 'material' : 'equipment';
    const temp: IData[] = [];
    props.chartData[objProp].forEach((el: string) => {
      let isPresent = temp.find(d => d.label === el);
      if (isPresent) {
        isPresent.value += 1;
        temp.map((item, i) => Object.assign({}, item, [isPresent]));
      } else {
        temp.push({ label: el, value: 1 });
      }
    });
    generateData(temp);
    setBarChartData(temp);
  }, [dataType])




  return (
    <div className={styles.ChartComponent} data-testid="ChartComponent">
      <ColorButton variant="outlined" onClick={handleOpen}>
        View More
      </ColorButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={'lg'}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <FormGroup>
            <FormControlLabel control={<MaterialChartSwitch sx={{ m: 1 }} defaultChecked />} label={chartType ? "Bar Chart" : "Pie Chart"}
              onChange={onChartTypeChange} />
            <FormControlLabel control={<MaterialDataSwitch sx={{ m: 1 }} defaultChecked />} label={dataType ? "Material" : "Equipment"}
              onChange={onDataTypeChange} />
          </FormGroup>
        </BootstrapDialogTitle>
        <DialogContent dividers style={{ 'display': "flex" }}>
          {barChartData != null && <ChartComp />}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}> Close </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}


export default ChartComponent;
