import React from "react";
import { Menu, Icon} from 'antd';
import PropTypes from 'prop-types';

const { SubMenu } = Menu;
export const MenuList = (menuData,selectKeys,openKeys,handleMenuClick) =>(
    <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={selectKeys}
        defaultOpenKeys={openKeys}
    >
        {menuData.map((item)=>{
            if (item.child.length > 0){
                return (
                    <SubMenu key={item.key} title ={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                        {item.child.map((subItem)=>{
                            return (
                                <Menu.Item key={subItem.key} onClick={()=>handleMenuClick(item.key)}>
                                    <span>{subItem.title}</span>
                                </Menu.Item>
                            )
                        })}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.key} onClick={()=>this.handleMenuClick(item.key)}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Menu.Item>
                )
            }
        })}
    </Menu>
);

MenuList.propTypes = {
    menuData:PropTypes.array,
    selectKeys:PropTypes.array,
    openKeys:PropTypes.array,
    handleMenuClick:PropTypes.func,
};

MenuList.defaultProps = {
    menuData:[
        {key:"welcome",icon:"table",title:"Welcome",child:[]},
        {key:"welcome2",icon:"table",title:"Welcome2",child:[]},
        {key:"test",icon:"table",title:"Test",child:[
                {key:"testPage",title:"TestPage"}
            ]
        },
        {key:"test2",icon:"table",title:"Test2",child:[
                {key:"testPage2",title:"TestPage2"}
            ]
        },
    ],
    selectKeys:["welcome"],
    openKeys:["welcome"],
    handleMenuClick:f=>f,
};

// export class MenuList extends Component {
//     constructor(props){
//         super(props);
//         this.state={
//             selectedKeys:[],
//             openKeys:[],
//         };
//         this.handleMenuClick.bind(this);
//         this.getOpenKeys.bind(this);
//     }
//
//     static propTypes = {
//         menuData:PropTypes.array,
//         onClickMenu:PropTypes.func,
//     };
//
//     static defaultProps = {
//         menuData:[
//             {key:"welcome",icon:"table",title:"Welcome",child:[]},
//             {key:"welcome2",icon:"table",title:"Welcome2",child:[]},
//             {key:"test",icon:"table",title:"Test",child:[
//                     {key:"testPage",title:"TestPage"}
//                 ]
//             },
//             {key:"test2",icon:"table",title:"Test2",child:[
//                     {key:"testPage2",title:"TestPage2"}
//                 ]
//             },
//         ],
//     };
//
//     handleMenuClick = (key="") => {
//         console.log(key);
//         console.log(this.getOpenKeys(key));
//         console.log(this.state);
//         this.setState({
//             openKeys:this.getOpenKeys(key),
//             selectedKeys:[key],
//         });
//         console.log(this.state);
//
//         const cFunc = this.props.onClickMenu;
//         cFunc(key);
//     };
//
//     render() {
//         const { SubMenu } = Menu;
//
//         const mData = this.props.menuData;
//         const selectedKeys = this.state.selectedKeys;
//         const openKeys = this.state.openKeys;
//
//         return (
//             <Menu
//                 theme="dark"
//                 mode="inline"
//                 defaultSelectedKeys={selectedKeys}
//                 defaultOpenKeys={openKeys}
//             >
//                 {mData.map((item)=>{
//                     if (item.child.length > 0){
//                         return (
//                             <SubMenu key={item.key} title ={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
//                                 {item.child.map((subItem)=>{
//                                     return (
//                                         <Menu.Item key={subItem.key} onClick={()=>this.handleMenuClick(item.key)}>
//                                             <span>{subItem.title}</span>
//                                         </Menu.Item>
//                                     )
//                                 })}
//                             </SubMenu>
//                         )
//                     } else {
//                         return (
//                             <Menu.Item key={item.key} onClick={()=>this.handleMenuClick(item.key)}>
//                                 <Icon type={item.icon} />
//                                 <span>{item.title}</span>
//                             </Menu.Item>
//                         )
//                     }
//                 })}
//             </Menu>
//         )
//     }
// }

//
// const MenuList = ({mData}) => {
//     const { SubMenu } = Menu;
//     return (
//         <Menu
//             theme="dark"
//             mode="inline"
//             defaultSelectedKeys={store.getState.SelectedKeys}
//             defaultOpenKeys={store.getState.MenuOpenKeys}
//             // onOpenChange={this.handleMenuOpenChange}
//         >
//             {mData.map((item)=>{
//                 if (item.child.length > 0){
//                     return (
//                         <SubMenu key={item.key} title ={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
//                             {item.child.map((subItem)=>{
//                                 return (
//                                     <Menu.Item key={subItem.key} onClick={()=>this.handleMenuClick(subItem.key)}>
//                                         <span>{subItem.title}</span>
//                                     </Menu.Item>
//                                 )
//                             })}
//                         </SubMenu>
//                     )
//                 } else {
//                     return (
//                         <Menu.Item key={item.key}>
//                             <Icon type={item.icon} />
//                             <span>{item.title}</span>
//                         </Menu.Item>
//                     )
//                 }
//             })}
//         </Menu>
//     )
// };