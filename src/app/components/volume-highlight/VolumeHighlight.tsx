import React from "react";
import { Volume } from "../../models/google-volumes";
import { getVibrant } from "../../utils/swatchHelper";
import styles from "./VolumeHighlight.module.css";

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
    </div>
  );
};

export default VolumeHighlightComponent;
