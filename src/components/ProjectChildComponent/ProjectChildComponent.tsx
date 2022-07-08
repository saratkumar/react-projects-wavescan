import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Chip, Grid } from '@mui/material';
import { style } from '@mui/system';
import React, { createContext, FC } from 'react';
import { WaveScanResponse } from '../../models/wave-scan.interface';
import ChartComponent from '../ChartComponent/ChartComponent';
import styles from './ProjectChildComponent.module.css';

interface ProjectChildComponentProps {
  itemList: WaveScanResponse[];
}

const UserContext = createContext('default');

const ProjectChildComponent: FC<ProjectChildComponentProps> = (props) => (
  <div className={styles.ProjectChildComponent} data-testid="ProjectChildComponent">
    <Grid container alignItems="stretch">
      {props.itemList.map((item, index) => {
        return (
          <Grid item xs={12} md={3} sm={12} className={styles.dFlex} key={index}>
            <Card className={styles.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.img}
                  alt={item.title}
                />
                <CardContent className={styles.p5}>
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
                </CardContent>
              </CardActionArea>
              <CardActions className={styles.justifyCenter}>
                <UserContext.Provider value={JSON.stringify(item.data)}>
                  <ChartComponent chartData={item.data}/>
                </UserContext.Provider>
              </CardActions>
            </Card>
          </Grid>
        )
      })}

    </Grid>

  </div>
);

export default ProjectChildComponent;
