import "./sidebar.css";
import menuItems from '../../menuItems.json'
import {
  LineStyle,
  Timeline,
  ExpandMore,
  ExpandLess
} from "@material-ui/icons";
import { ListItem, Collapse, ListItemText, Drawer, List,  } from "@material-ui/core";

import { Link } from "react-router-dom";
// 

import React, { Component } from 'react'
import { withStyles } from "@material-ui/styles";

const styles = {
  root:{
    padding: "20px",
    color: "#555",
  },
  list: {
    flex:1,
    width:240
  },
  links: {
    textDecoration: "none"
  },
  menuHeader: {
    paddingLeft: "30px"
  }
};

class Sidebar extends Component {
  
  constructor( props ) {
    super( props )
    this.state = {}
  }
  
  handleClick( item ) {
    this.setState( prevState => ( 
      { [ item ]: !prevState[ item ] } 
    ) )
  }

  handler( children ) {
    const { classes } = this.props
    const { state } = this
    return children.map( ( subOption ) => {
      if ( !subOption.children ) {
        return (
          <div key={ subOption.name }>
            <ListItem 
              button 
              key={ subOption.name }
              className='sidebarmenu'
            >
              <Link 
                className={classes.links}
                to={{ 
                  pathname: subOption.url,
                  state: subOption
                }}
              >
                <ListItemText 
                  inset 
                  // classes={{primary:'sidebarTitle'}}
                  primary={ subOption.name }
                />
              </Link>
            </ListItem>
          </div>
        )
      }
      return (
        <div key={ subOption.name }>
          <ListItem 
            button 
            onClick={ () => this.handleClick( subOption.name ) }>
            <ListItemText 
              inset
              // classes={{primary:'sidebarTitle'}}
              primary={ subOption.name } />
            { state[ subOption.name ] ? 
              <ExpandLess /> :
              <ExpandMore />
            }
          </ListItem>
          <Collapse 
            in={ state[ subOption.name ] } 
            timeout="auto" 
            unmountOnExit
          >
            { this.handler( subOption.children ) }
          </Collapse>
        </div>
      )
    } )
  }

  render() {
    const { classes, drawerOpen, menuOptions } = this.props
    return (
      <div className="sidebar">
        <Drawer 
          variant="persistent" 
          anchor="left"
          open
          classes={ { root: 'sidebar', paper: classes.list } }>
          <div>
            <List className='sidebarmenu'>
              <ListItem 
                key="menuHeading"
                divider
                disableGutters
              >
                <ListItemText
                  inset
                  primary="Prototype"
                />
              </ListItem>
            { this.handler( menuItems.data ) }
            </List>
          </div>
        </Drawer>
      </div>
    )
  }
}


//   render() {
//     return (
//       <div className="sidebar">
//          <div className="sidebarWrapper">
//            <div className="sidebarMenu">
//              <h3 className="sidebarTitle">Dashboard</h3>
//              <ul className="sidebarList">
//                <Link to="/cooling-loss" className="link">
//                <li className="sidebarListItem">
//                  <LineStyle className="sidebarIcon" />
//                  Cooling Loss
//                </li>
//                </Link>
//                <Link to="/local-bearing" className="link">
//                <li className="sidebarListItem">
//                  <LineStyle className="sidebarIcon" />
//                  Local Bearing
//                </li>
//                </Link>
//              </ul>
//            </div>
//          </div>
//        </div>
//     )
//   }
// }

export default withStyles(styles)(Sidebar);

