import React, { FunctionComponent } from "react";
import { Route } from "react-router-dom";
import { Bookshelf } from "../../models/google-bookshelves";
import BookshelfVolumes from "../bookshelf-volumes/BookshelfVolumes";
import { Tabs } from "@material-ui/core";
import TabWithLink from "../../components/tab-with-link/TabWithLink";

type Props = {
  startTab: string | undefined;
  bookshelves: Bookshelf[];
};

const BookshelvesComponent: FunctionComponent<Props> = props => {
  const [tab, setTab] = React.useState(
    props.startTab
      ? props.startTab
      : props.bookshelves[0]
      ? props.bookshelves[0].id
      : undefined
  );

  return (
    <div>
      <Tabs
        value={tab}
        onChange={(event, value) => setTab(value)}
        variant="fullWidth"
        centered={true}
      >
        {props.bookshelves.map(bookshelf => (
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

export default BookshelvesComponent;
