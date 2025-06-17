import React from "react";
import {
    Box,
    Tooltip,
    Divider,
    List,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    IconButton,
    Avatar
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { useDispatch } from "react-redux";
import actions from "../../../Store/actions";
import styles from "./styles";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    items: Array<any>,
    onClose: Function,
    open: boolean
};

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
}));

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: "hidden",
    backgroundColor: '#f2f2f2', 
    borderRight: 0,
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`
    },
    backgroundColor: '#f2f2f2', 
    borderRight: 0,    
});

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),      
    }),
}));

const avatarMenuList = [
    {
        key: "profile",
        name: "Profile",
        path: "profile"
    },
    {
        key: "logout",
        name: "Logout",
        path: "logout"
    }
];

/**
 * App Drawer Component
 * @param {Props} props
 */
export default ({ items, onClose, open, toggleDrawer }: Props) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const title = "Home";

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const hdlItemMenuClick = (item) => {
        navigate(item.path);
        onClose();
    };

    const hdlAvatarMenuClick = async (item) => {
        if (item.key === "logout") {
            await dispatch(actions.auth.create.logout());
            navigate("/logout");
        } else {
            navigate(item.path);
            setAnchorElUser(null);
        }
    };

    const AvatarMenu = () => {
        return (
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {avatarMenuList.map((item) => (
                    <MenuItem
                        key={item.key}
                        onClick={() => hdlAvatarMenuClick(item)}
                    >
                        <Typography textAlign="center">{item.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        );
    };

    return (
        <>
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{paddingLeft:"2rem !important"}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: "none" })
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" }
                        }}
                    >
                        <Typography variant="h6" noWrap component="div">
                            {title}
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar sx={{ bgcolor: "#CC7E31" }}>PL</Avatar>
                            </IconButton>
                        </Tooltip>
                        <AvatarMenu />
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} >
                <DrawerHeader>
                    <IconButton onClick={onClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{paddingLeft:"1rem"}}>
                    {items.map((item, index) => (
                        <ListItem
                            key={item.primary}
                            disablePadding
                            sx={{ display: "block" }}
                            onClick={() => hdlItemMenuClick(item)}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center"
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.primary}
                                    sx={{ opacity: open ? 1 : 0 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export { DrawerHeader };
