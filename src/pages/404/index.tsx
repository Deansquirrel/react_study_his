import React from 'react';
import { history } from 'umi';
import { Button, Space } from 'antd';

import './index.less';
import BaseComponentWithStore from '@/components/BaseComponentWithStore';

const gotoBack = () => {
  history.goBack();
};

const gotoWelcome = () => {
  history.push('/');
};

class Welcome extends BaseComponentWithStore<{}, {}> {
  render() {
    return (
      <div id="div-404">
        <Space>
          <Button type="primary" onClick={gotoBack}>
            Back
          </Button>
          <Button type="primary" onClick={gotoWelcome}>
            Welcome
          </Button>
        </Space>
      </div>
    );
  }
}

// const Welcome = () => {
//     return (
//         <div id={"div-404"}>
//             <Space>
//                 <Button type="primary" onClick={gotoBack}>
//                     Back
//             </Button>
//                 <Button type="primary" onClick={gotoWelcome}>
//                     Welcome
//             </Button>
//             </Space>
//         </div>
//     )
// }

export default Welcome;
