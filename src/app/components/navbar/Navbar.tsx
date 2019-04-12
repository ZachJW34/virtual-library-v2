import {
  Avatar,
  IconButton,
  InputBase,
  SvgIcon
  } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React from 'react';
import styles from './Navbar.module.css';
import bookLogo from '../../assets/images/book-logo.svg';

const NavbarComponent: React.FC<{}> = props => {
  return (
    <div className={styles.container}>
      <div className={`${styles.flex} ${styles.flexStart}`}>
        <InputBase
          placeholder="Search"
          startAdornment={
            <IconButton>
              <Search />
            </IconButton>
          }
        />
      </div>
      <div className={styles.flex}>
        <svg fill="rgb(215, 210, 254)" xmlns="http://www.w3.org/2000/svg" width="13" height="25">
          <path d="M0 0l13 5v20L0 20z" />
        </svg>
        <svg fill="rgb(143, 134, 255)" xmlns="http://www.w3.org/2000/svg" width="13" height="25">
          <path d="M0 5l13-5v20L0 25z" />
        </svg>
      </div>
      <div className={`${styles.flex} ${styles.flexEnd}`}>
        <Avatar src="https://lh4.googleusercontent.com/-lMzLSgycrTc/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfG1JTb4pQA4MJP3EEbri-FMOhsbw/s96-c/photo.jpg" />
      </div>
    </div>
  );
};

export default NavbarComponent;
