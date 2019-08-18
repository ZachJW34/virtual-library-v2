import React, { FunctionComponent, useEffect, useState } from "react";
import {RouteComponentProps, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBookshelves } from "../../reducers/index";
import { Tabs } from "@material-ui/core";
import TabWithLink from "../../components/tab-with-link/TabWithLink";
import BookshelfVolumes from '../bookshelf-volumes/BookshelfVolumes';

const Bookshelves: FunctionComponent<RouteComponentProps> = props => {
  const bookshelves = useSelector(getBookshelves);
  const [tab, setTab] = useState(
    ((res: RegExpMatchArray | null) => (res ? res[1] : bookshelves[0].id))(
      props.history.location.pathname.match(/\/home\/bookshelves\/(\d+)/)
    )
  );

  useEffect(() => {
    props.history.push(`${props.match.path}/${tab}`);
  }, [])

  return (
    <div>
      <Tabs
        value={tab}
        onChange={(event, value) => setTab(value)}
        variant="fullWidth"
        centered={true}
      >
        {bookshelves.map(bookshelf => (
          <TabWithLink
            value={bookshelf.id}
            key={bookshelf.id}
            to={`/home/bookshelves/${bookshelf.id}`}
            label={bookshelf.title}
          />
        ))}
      </Tabs>
      <Route
        path="/home/bookshelves/:bookshelfId"
        component={BookshelfVolumes}
      />
    </div>
  );
};

export default Bookshelves;
