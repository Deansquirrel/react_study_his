import React from 'react';
import { Link } from 'umi';
import styles from './index.less';

export default function IndexPageBB() {
  return (
    <div>
      <h1 className={styles.title}>Page index BB</h1>
      <ol>
        <li>
          <Link to="/">ROOT</Link>
        </li>
        <li>
          <Link to="/pageA/pageAA">Users Page AA</Link>
        </li>
        <li>
          <Link to="/pageA/pageAB">Users Page AB</Link>
        </li>
        <li>
          <Link to="/pageB/pageBA">Users Page BA</Link>
        </li>
        <li>
          <Link to="/pageB/pageBB">Users Page BB</Link>
        </li>
      </ol>
    </div>
  );
}
