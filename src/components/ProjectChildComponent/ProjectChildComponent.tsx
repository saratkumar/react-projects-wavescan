import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Grid, Chip } from '@mui/material';
import { style } from '@mui/system';
import { FC } from 'react';
import { WaveScanResponse } from '../../models/wave-scan.interface';
import ChartComponent from '../ChartComponent/ChartComponent';
import styles from './ProjectChildComponent.module.css';

interface ProjectChildComponentProps {
  itemList: WaveScanResponse[];
}


const ProjectChildComponent: FC<ProjectChildComponentProps> = (props) => (
  <div className={styles.ProjectChildComponent} data-testid="ProjectChildComponent">
    <Grid container alignItems="stretch">
      {props.itemList.map((item, index) => {
        return (
          <Grid item xs={12} md={4} sm={6} lg={3} className={styles.dFlex} key={index}>
            <Card className={styles.card}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.img}
                  alt={item.title}
                />
                <CardContent className={styles.cardContent}>
                  <Typography className={styles.title} gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <div className={styles.textLeft}>
                    {item.tags.map((tag, tagIndex) => {
                      return (
                        <Chip key={tagIndex} label={tag} className={styles.chip + ' ' + styles.textLeft} />
                      )
                    })}
                  </div>
                  <Typography className={styles.field + ' ' + styles.description} variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <CardActions className={styles.justifyCenter}>
                  <ChartComponent chartData={item.data}/>
                  </CardActions>
                </CardContent>
             
            </Card>
          </Grid>
        )
      })}

    </Grid>

  </div>
);

export default ProjectChildComponent;
