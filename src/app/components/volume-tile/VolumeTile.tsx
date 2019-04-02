import Typography from '@material-ui/core/Typography';
import { Star } from '@material-ui/icons';
import React from 'react';
import styles from './VolumeTile.module.css';
import { Volume } from '../../models/google-volumes';
import RatingsComponent from '../ratings/Ratings';


type Props = {
  volume: Volume
}

const VolumeTileComponent: React.FC<Props> = props => {

  return(
    <div className={styles.container}>
      <img className={styles.thumbnail} src={props.volume.volumeInfo.imageLinks.thumbnail} />
      <div className={styles.description}>
        <Typography className={styles.title} variant="body2" gutterBottom >
          {props.volume.volumeInfo.title}
        </Typography>
        <Typography className={styles.authors} variant="body1" noWrap gutterBottom >
          {props.volume.volumeInfo.authors ? props.volume.volumeInfo.authors.join(', ') : null}
        </Typography>
        <RatingsComponent rating={props.volume.volumeInfo.averageRating}/>
      </div>
    </div>
  )
}

export default VolumeTileComponent;
