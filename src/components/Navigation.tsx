import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import CodeIcon from '@mui/icons-material/Code';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HistoryIcon from '@mui/icons-material/History';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import List from '@mui/material/List';
import ListIcon from '@mui/icons-material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Toolbar from '@mui/material/Toolbar';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const drawerWidth = 260;

const navItems = [
  { label: 'Expertise', id: 'expertise', icon: CodeIcon },
  { label: 'History', id: 'history', icon: HistoryIcon },
  { label: 'Projects', id: 'projects', icon: WorkOutlineIcon },
  { label: 'Contact', id: 'contact', icon: ContactMailIcon },
] as const;

const sectionIds = navItems.map((item) => item.id);

interface NavigationProps {
  parentToChild: { mode: string };
  modeChange: () => void;
}

function Navigation({ parentToChild, modeChange }: NavigationProps) {
  const { mode } = parentToChild;
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navigation");
      if (navbar) {
        setScrolled(window.scrollY > navbar.clientHeight);
      }
      if (window.scrollY < 120) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleSections.set(entry.target.id, entry.intersectionRatio);
        });

        let bestSection = '';
        let bestRatio = 0;

        visibleSections.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestSection = id;
          }
        });

        if (bestSection && bestRatio > 0.15) {
          setActiveSection(bestSection);
        }
      },
      {
        rootMargin: '-32% 0px -48% 0px',
        threshold: [0, 0.15, 0.35, 0.55, 0.75],
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    const navbar = document.getElementById('navigation');
    if (element) {
      const navHeight = navbar?.offsetHeight ?? 64;
      const top = element.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const drawer = (
    <Box className="navigation-bar-responsive" sx={{ textAlign: 'left' }}>
      <p className="mobile-menu-top"><ListIcon />Menu</p>
      <Divider />
      <List>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                className={isActive ? 'nav-drawer-link active' : 'nav-drawer-link'}
                onClick={() => scrollToSection(item.id)}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="https://pyvisual.co"
            target="_blank"
            rel="noreferrer"
            className="nav-drawer-link nav-drawer-link--cta"
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <OpenInNewIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="View PyVisual" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box className="nav-wrapper">
      <CssBaseline />
      <AppBar component="nav" id="navigation" className={`navbar-fixed-top${scrolled ? ' scrolled' : ''}`}>
        <Toolbar className="navigation-bar" disableGutters>
          <div className="nav-inner">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 0.5, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <button
              type="button"
              className="nav-brand"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
            >
              AA<span className="nav-brand-dot">.</span>
            </button>

            <nav className="nav-links" aria-label="Primary">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`nav-link${isActive ? ' active' : ''}`}
                    onClick={() => scrollToSection(item.id)}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <Icon fontSize="small" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="nav-actions">
              <a
                className="nav-cta"
                href="https://pyvisual.co"
                target="_blank"
                rel="noreferrer"
              >
                View PyVisual
                <OpenInNewIcon sx={{ fontSize: '0.95rem' }} />
              </a>
              <IconButton
                color="inherit"
                onClick={modeChange}
                aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navigation;
