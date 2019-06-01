import { IconButton, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import styles from './VolumeHighlight.module.css';
import { Volume } from '../../models/google-volumes';
import { getVibrant } from '../../utils/swatchHelper';
import RatingsComponent from '../ratings/Ratings';

type Props = {
  volume: Volume;
};

const VolumeHighlightComponent: React.FC<Props> = props => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: getVibrant(
          props.volume.volumeInfo.palette,
          "inherit",
          0.5
        )
      }}
    >
      <img src={props.volume.volumeInfo.imageLinks.thumbnail} />
      <div className={styles.general}>
        <div className={styles.description}>
          <Typography
            className={styles.title}
            color="inherit"
            variant="h5"
            gutterBottom
          >
            {props.volume.volumeInfo.title}
          </Typography>
          <Typography
            className={styles.authors}
            color="inherit"
            variant="h6"
            noWrap
            gutterBottom
          >
            {props.volume.volumeInfo.authors
              ? props.volume.volumeInfo.authors.join(", ")
              : null}
          </Typography>
          <RatingsComponent
            rating={props.volume.volumeInfo.averageRating}
            startColor="white"
            endColor={getVibrant(props.volume.volumeInfo.palette, "inherit")}
          />
        </div>
      </div>
      <div className={styles.description}>
        <Typography
          className={styles.title}
          color="inherit"
          variant="body2"
          gutterBottom
        >
          {props.volume.volumeInfo.description}
        </Typography>
      </div>
    </div>
  );
};

export default VolumeHighlightComponent;
