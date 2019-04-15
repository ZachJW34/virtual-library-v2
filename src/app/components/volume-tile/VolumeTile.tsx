import { IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Delete } from "@material-ui/icons";
import React from "react";
import styles from "./VolumeTile.module.css";
import { Volume } from "../../models/google-volumes";
import { getVibrant } from "../../utils/swatchHelper";
import RatingsComponent from "../ratings/Ratings";

type Props = {
  volume: Volume;
  selectVolume: (volume: Volume) => void;
  deleteVolume?: (volume: Volume) => void;
};

const VolumeTileComponent: React.FC<Props> = props => {
  return (
    <div
      className={styles.container}
      onClick={() => props.selectVolume(props.volume)}
    >
      <img
        id={props.volume.id}
        className={styles.thumbnail}
        src={props.volume.volumeInfo.imageLinks.smallThumbnail}
      />
      <div className={styles.description}>
        <Typography className={styles.title} variant="body2" gutterBottom>
          {props.volume.volumeInfo.title}
        </Typography>
        <Typography
          className={styles.authors}
          variant="body1"
          noWrap
          gutterBottom
        >
          {props.volume.volumeInfo.authors
            ? props.volume.volumeInfo.authors.join(", ")
            : null}
        </Typography>
        <RatingsComponent
          rating={props.volume.volumeInfo.averageRating}
          color={getVibrant(props.volume.volumeInfo.palette, "gold")}
        />
        {!!props.deleteVolume ? (
          <div className={styles.delete}>
            <IconButton
              onClick={event => {
                event.stopPropagation();
                return props.deleteVolume
                  ? props.deleteVolume(props.volume)
                  : () => null;
              }}
            >
              <Delete />
            </IconButton>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VolumeTileComponent;
