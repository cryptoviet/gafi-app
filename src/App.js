import { Box, Portal, useDisclosure } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import DashboardLayout from 'layouts/DashboardLayout'
import React, { createRef, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'

import featureFlags from './components/FeatureFlags'
import MainPanel from './components/layout/MainPanel'
import PanelContainer from './components/layout/PanelContainer'
import PanelContent from './components/layout/PanelContent'
import AdminNavbar from './components/navbars/AdminNavbar'
import SideBar from './components/sideBar/SideBar'
import routes from "./routes"
import { SubstrateContextProvider, useSubstrateState } from './substrate-lib'
import { DeveloperConsole } from './substrate-lib/components'



function Main() {
  const { t } = useTranslation();
  const { apiState, apiError, keyringState } = useSubstrateState()
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const mainPanel = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fixed, setFixed] = useState(false);
  const [brandText, setBrandText] = useState('');
  const location = useLocation();
  

  // functions for changing the states from components
  const getRoute = () => window.location.pathname !== "/admin/full-screen-maps";
  // TODO: Define type for route
  const getActiveRoute = (routes) => {
    const activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        const categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };

  useEffect(() => {
    setBrandText(getActiveRoute(routes));
  }, [location])
   // TODO: Define type for route
   const getActiveNavbar = (routes )  => {
    const activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        const categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        if (routes[i].secondaryNavbar) {
          return routes[i].secondaryNavbar;
        }
      }
    }
    return activeNavbar;
   };
  
  // TODO: Define type for route
  const getRoutes = (routes) =>
    routes.map((prop) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
          />
        );
      }
      return null;
    });

  const contextRef = createRef()

  return (
    <>
       <SideBar
        routes={routes}
        logoText={t("GAFI_DASHBOARD")}
        display="none"
        sidebarVariant={sidebarVariant}
      />
      
      <MainPanel
        ref={mainPanel}
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText={t("GAFI_DASHBOARD")}
            brandText={brandText}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <AnimatePresence>
                <Switch>
                  {React.Children.toArray(getRoutes(routes))}
                  <Redirect from="/admin" to="/admin/dashboard" />
                  <Redirect from="/" to="/admin/dashboard" />
                </Switch>
              </AnimatePresence>
            </PanelContainer>
          </PanelContent>
        ) : null}
        
      </MainPanel>
      
      <DeveloperConsole />
    </>
  )
}

function PageContent(){
  const getRoutes = (route) =>
    routes.map((prop) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === 'account') {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/admin') {
        return (
          <Route path={prop.layout + prop.path} component={prop.component} />
        );
      }
      return null;
    });
  return (<Box>
    <Switch>
      {React.Children.toArray(getRoutes(routes))}
      <Redirect from="/admin" to="/admin/dashboard" />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Box>)
}

export default function App() {
  return (
    <SubstrateContextProvider>
      {featureFlags.isDisplayNewDashboardUI ? 
      (
        <DashboardLayout>
          <PageContent/>
        </DashboardLayout>
      ) : (<Main/>)}
    </SubstrateContextProvider>
  )
}
