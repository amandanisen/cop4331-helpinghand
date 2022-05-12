import React from 'react'
import * as FaIcons from "react-icons/fa";
import { VscEdit } from "react-icons/vsc";
import { RiLogoutBoxLine} from "react-icons/ri";
export const SidebarData = [
    {
        title: ' Edit',
        path: '/edit',
        icon: <VscEdit/>,
        cName: 'nav-text'
    },
    {
        title: ' Logout',
        path: '/',
        icon: <RiLogoutBoxLine/>,
        cName: 'nav-text'
    }
]
// export default function Sidebar() { 
//      return 
//  }