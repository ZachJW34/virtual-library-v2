import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styles from './BookshelfVolumes.module.css';
import * as bookshelvesActions from '../../actions/bookshelves';
import VolumeHighlightComponent from '../../components/volume-highlight/VolumeHighlight';
import { VolumeSearchFormComponent } from '../../components/volume-search-form/VolumeSearchForm';
import VolumeTileComponent from '../../components/volume-tile/VolumeTile';
import { Volume, VolumeSearchParams, VolumeSearchResponse } from '../../models/google-volumes';
import { getBookshelfById, getVolumesByBookshelfId, State } from '../../reducers';
import { addQueryParams } from '../../utils/fetchHelper';

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
        bookshelvesActions.addVolumeToBookshelf(bookshelf.id, volume)
      ),
    [dispatch]
  );

  const deleteVolumeFromBookshelf = useCallback(
    volume =>
      dispatch(
        bookshelvesActions.deleteVolumeFromBookshelf(bookshelf.id, volume)
      ),
    [dispatch]
  );

  const [volumeSearch, setVolumeSearch] = useState({} as VolumeSearchResponse);

  const searchVolumes = (params: VolumeSearchParams) => {
    fetch(`/volumes${addQueryParams(params)}`, {
      headers: { Authorization: `Bearer ${props.accessToken}` }
    })
      .then(res => res.json())
      .then(res => setVolumeSearch(res));
  };

  const selectVolume = (volume: Volume) => {
    props.history.push(`/home/volume/${volume.id}`)
  };

  return (
    <div>
      {/* {selectedVolume ? (
        <div className={styles.selected}>
          <VolumeHighlightComponent volume={selectedVolume} clickTileCallback={clickTileCallback}/>
        </div>
      ) : null} */}
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
