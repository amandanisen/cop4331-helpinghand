import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { useState } from 'react';
import './appbar.css';
import { SidebarData } from '../sidebar/SidebarData.js';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#005424',
        // color: '#19ae59',

    },
    menuButton: {
        // marginRight: theme.spacing(2),
    },
    title: {
        color: "#FFFFFF",
        flexGrow: 1,
        // display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        textAlign: "center",
    },
    backIcon: {
        color: '#FFFFFF',
    },
    inputRoot: {
        // color: 'rgba(226,248,235,1)'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export default function Appbar(props) {
    const classes = useStyles();

    let history = useHistory();

    let appbarType = props;
    let appBarName;

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    
    return (
        <>
            {(props.type === "Coordinator")
                ? 
                <AppBar position="static" >
                    <Toolbar variant="dense" className={classes.root}>
                    <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                  <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                  </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                  <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                      <Link to='#' className='menu-bars'>
                        <AiIcons.AiOutlineClose />
                      </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                      return (
                        <li key={index} className={item.cName}>
                          <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </IconContext.Provider>
              
            <Typography className={classes.title} variant="h6" noWrap>Coordinator</Typography>
                    <IconButton
                    alginSelf= 'flex-end' 
                    edge="end"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                     <ArrowBackIosIcon onClick={() => history.goBack()} />
                </IconButton>
                </Toolbar>
            </AppBar>
            :
            <AppBar position="static" >
            <Toolbar variant="dense" className={classes.root}>
            <IconContext.Provider value={{ color: '#fff' }}>
            <div className='navbar'>
              <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className='nav-menu-items' onClick={showSidebar}>
                <li className='navbar-toggle'>
                  <Link to='#' className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </IconContext.Provider>
   
             <Typography className={classes.title} variant="h6" noWrap>
                         Volunteer
                     </Typography>
                     <IconButton
                      alginSelf= 'flex-end' 
                      edge="end"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="open drawer"
                  >
                      <ArrowBackIosIcon onClick={() => history.goBack()} />
                  </IconButton>
                 </Toolbar>
             </AppBar>
           }

       </>
    );
}
