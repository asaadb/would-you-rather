import React from "react";
import { resetAuthedUser } from "../actions/authedUser";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { IoMdMenu } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { MdLibraryAdd, MdHome, MdDashboard } from "react-icons/md";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  appBar: {
    backgroundColor: "#605052"
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    margin: 10,
    marginLeft: 20
  },
  menuButton: {
    marginLeft: -12,
    marginLight: 20
  },
  list: {
    width: 250
  },
  avatar: {
    margin: 10
  }
};
class Nav extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  handleLogout = event => {
    event.preventDefault();
    const { dispatch, authedUser } = this.props;
    dispatch(resetAuthedUser(authedUser));
  };

  render() {
    const { classes, user } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <div>
                <IoMdMenu onClick={this.toggleDrawer("left", true)} />
                <Drawer
                  open={this.state.left}
                  onClose={this.toggleDrawer("left", false)}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer("left", false)}
                    onKeyDown={this.toggleDrawer("left", false)}
                  >
                    <div className={classes.list}>
                      <List>
                        <ListItem>
                          <NavLink to="/" exact activeClassName="active">
                            <ListItemIcon>
                              <MdHome />
                            </ListItemIcon>
                            Home
                          </NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink to="/new" activeClassName="active">
                            <ListItemIcon>
                              <MdLibraryAdd />
                            </ListItemIcon>
                            New Poll
                          </NavLink>
                        </ListItem>
                        <ListItem>
                          <NavLink to="/leaderboard" activeClassName="active">
                            <ListItemIcon>
                              <MdDashboard />
                            </ListItemIcon>
                            Leader Board
                          </NavLink>
                        </ListItem>
                      </List>
                    </div>
                  </div>
                </Drawer>
              </div>
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              align="left"
            >
              Would You Rather?
            </Typography>
            <span className="user-name-nav">{`Hello, ${user.name}`}</span>
            <Avatar
              alt={`${user.name} avatar`}
              src={user.avatarURL}
              className="avatar"
            />
            <Button color="inherit" onClick={this.handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    user: users[authedUser]
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Nav));
