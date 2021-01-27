import React from 'react';

import styles from './Common.less';
// import BaseComponent from "@/components/BaseComponent";

class CommonLayouts extends React.Component {
  render() {
    return <div className={styles.layout_common}>{this.props.children}</div>;
  }
}

export default CommonLayouts;
