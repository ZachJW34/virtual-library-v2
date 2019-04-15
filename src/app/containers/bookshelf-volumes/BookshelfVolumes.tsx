import React, { useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators } from "redux";
import styles from "./BookshelfVolumes.module.css";
import * as bookshelvesActions from "../../actions/bookshelves";
import { VolumeSearchFormComponent } from "../../components/volume-search-form/VolumeSearchForm";
import VolumeTileComponent from "../../components/volume-tile/VolumeTile";
import { Dispatch } from "../../constants/action-types";
import { Bookshelf } from "../../models/google-bookshelves";
import {
  Volume,
  VolumeSearchParams,
  VolumeSearchResponse
} from "../../models/google-volumes";
import {
  getBookshelfById,
  getVolumesByBookshelfId,
  State
} from "../../reducers";
import { addQueryParams } from "../../utils/fetchHelper";
import { getVibrant } from "../../utils/swatchHelper";
import VolumeHighlightComponent from "../../components/volume-highlight/VolumeHighlight";

type Props = {
  bookshelf: Bookshelf;
  volumes: Volume[];
  accessToken: string;
  fetchAddVolumeToBookshelf: typeof bookshelvesActions.fetchAddVolumeToBookshelf;
  fetchDeleteVolumeFromBookshelf: typeof bookshelvesActions.fetchDeleteVolumeFromBookshelf;
} & RouteComponentProps<{ [key: string]: string }>;

const BookshelfVolumesComponent: React.FC<Props> = props => {
  const [volumeSearch, setVolumeSearch] = useState({} as VolumeSearchResponse);
  const [selectedVolume, setSelectedVolume] = useState(
    !!props.volumes.length ? props.volumes[0] : undefined
  );

  const searchVolumes = (params: VolumeSearchParams) => {
    fetch(`/volumes${addQueryParams(params)}`, {
      headers: { Authorization: `Bearer ${props.accessToken}` }
    })
      .then(res => res.json())
      .then(res => setVolumeSearch(res));
  };

  const addVolumeToBookshelf = (volume: Volume) => {
    props.fetchAddVolumeToBookshelf(props.bookshelf.id, volume);
  };

  const deleteVolumeFromBookshelf = (volume: Volume) => {
    props.fetchDeleteVolumeFromBookshelf(props.bookshelf.id, volume);
  };

  const selectVolume = (volume: Volume) => {
    console.log(volume);
    setSelectedVolume(volume);
  };

  return (
    <div>
      {selectedVolume ? (
        <VolumeHighlightComponent volume={selectedVolume} />
      ) : null}
      {/* <div className={styles.selected} styles={{ backgroundColor: selectedVolume. }}>

      </div> */}
      <div className={styles["volumes-container"]}>
        {props.volumes.map(volume => (
          <div key={volume.id} className={styles["volume-tile"]}>
            <VolumeTileComponent
              volume={volume}
              deleteVolume={deleteVolumeFromBookshelf}
              selectVolume={selectVolume}
            />
          </div>
        ))}
      </div>
      <div>
        <span>---Volume Search---</span>
        <VolumeSearchFormComponent callback={searchVolumes} />
        {volumeSearch.items
          ? volumeSearch.items.map(volume => (
              <button
                key={volume.id}
                onClick={() => addVolumeToBookshelf(volume)}
              >
                {volume.volumeInfo.title}
              </button>
            ))
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = (
  state: State,
  ownProps: RouteComponentProps<{ [key: string]: string }> & {}
) => ({
  bookshelf: getBookshelfById(state, ownProps.match.params.bookshelfId),
  volumes: getVolumesByBookshelfId(state, ownProps.match.params.bookshelfId),
  ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(bookshelvesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookshelfVolumesComponent);
