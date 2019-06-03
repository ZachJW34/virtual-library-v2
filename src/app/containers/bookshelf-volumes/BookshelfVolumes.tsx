import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import styles from "./BookshelfVolumes.module.css";
import * as bookshelvesActions from "../../actions/bookshelves";
import VolumeHighlightComponent from "../../components/volume-highlight/VolumeHighlight";
import { VolumeSearchFormComponent } from "../../components/volume-search-form/VolumeSearchForm";
import VolumeTileComponent from "../../components/volume-tile/VolumeTile";
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
import { useDispatch, useSelector } from "../../types/redux-hooks";
import { addQueryParams } from "../../utils/fetchHelper";

type Props = {
  accessToken: string;
} & RouteComponentProps<{ [key: string]: string }>;

const BookshelfVolumesComponent: React.FC<Props> = props => {
  const { bookshelf, volumes } = useSelector((state: State) => ({
    bookshelf: getBookshelfById(state, props.match.params.bookshelfId),
    volumes: getVolumesByBookshelfId(state, props.match.params.bookshelfId)
  }));
  const dispatch = useDispatch();

  const addVolumeToBookshelf = useCallback(
    volume =>
      dispatch(
        bookshelvesActions.fetchAddVolumeToBookshelf(bookshelf.id, volume)
      ),
    [dispatch]
  );

  const deleteVolumeFromBookshelf = useCallback(
    volume =>
      dispatch(
        bookshelvesActions.fetchDeleteVolumeFromBookshelf(bookshelf.id, volume)
      ),
    [dispatch]
  );

  const [volumeSearch, setVolumeSearch] = useState({} as VolumeSearchResponse);
  const [selectedVolume, setSelectedVolume] = useState(
    !!volumes.length ? volumes[0] : undefined
  );

  useEffect(
    () => setSelectedVolume(!!volumes.length ? volumes[0] : undefined),
    [props.match.params.bookshelfId]
  );

  const searchVolumes = (params: VolumeSearchParams) => {
    fetch(`/volumes${addQueryParams(params)}`, {
      headers: { Authorization: `Bearer ${props.accessToken}` }
    })
      .then(res => res.json())
      .then(res => setVolumeSearch(res));
  };

  const selectVolume = (volume: Volume) => {
    setSelectedVolume(volume);
  };

  return (
    <div>
      {selectedVolume ? (
        <div className={styles.selected}>
          <VolumeHighlightComponent volume={selectedVolume} />
        </div>
      ) : null}
      <div className={styles["volumes-container"]}>
        {volumes.map(volume => (
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

export default BookshelfVolumesComponent;
