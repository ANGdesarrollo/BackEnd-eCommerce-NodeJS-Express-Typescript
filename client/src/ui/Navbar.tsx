import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {NavLink} from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {logout} from "../store/slices/auth/thunk";
import {Ring} from "@uiball/loaders";
import {navItemsStyle, TypographyStyle} from "./muiStyles";


const pages = ['Products', 'Chat', 'Orders'];

export const Navbar = () => {
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector(state => state.auth);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const onLogout = () => {
        dispatch(logout());
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={TypographyStyle}
                    >
                        REACT DASHBOARD
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <NavLink style={navItemsStyle} to={`/dashboard/${page.toLowerCase()}`}>{page}</NavLink></Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                <NavLink style={navItemsStyle} to={`/dashboard/${page.toLowerCase()}`}>{page}</NavLink>
                            </Button>
                        ))}
                    </Box>
                    <Box>
                        {
                            !loading ?
                                <>
                                    <IconButton onClick={onLogout} color="inherit">
                                        <ExitToAppIcon/>
                                    </IconButton>
                                </> :
                                <Ring size={35}/>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
