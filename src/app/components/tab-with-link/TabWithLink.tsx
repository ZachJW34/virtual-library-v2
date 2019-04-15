import React from 'react';
import Tab, { TabProps } from '@material-ui/core/Tab';
import { Link, LinkProps } from 'react-router-dom';

type Props = TabProps & LinkProps;

const TabWithLink: React.FC<Props> = props => {
  const { to, replace, ...tabProps } = props;

  return (
    <Link to={to} replace={replace} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Tab component={'span'} {...tabProps}/>
    </Link>
  );
}

export default TabWithLink;
