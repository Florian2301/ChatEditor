import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Suspense, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { store } from './store';
import { useMediaQuery } from 'react-responsive';
const MainDesktop = React.lazy(() => import('./modules/main/MainDesktop/MainDesktop'));
const MainMobile = React.lazy(() => import('./modules/main/MainMobile/MainMobile'));
const MainTabletLeft = React.lazy(() => import('./modules/main/MainTablet/MainTabletLeft'));
const MainTabletRight = React.lazy(() => import('./modules/main/MainTablet/MainTabletRight'));
export default function App() {
    const [bigScreen, setBigScreen] = useState(1400); // 1200
    const [mediumScreen, setMediumScreen] = useState(1000); //768
    const viewAuto = () => {
        setBigScreen(1400); // 1200
        setMediumScreen(1000); // 768
    };
    const viewDesktop = () => {
        setBigScreen(1400); // 980
        setMediumScreen(1000); // 768
    };
    const viewTablet = () => {
        setBigScreen(3000); // 3000
        setMediumScreen(1000); // 768
    };
    const viewMobile = () => {
        setBigScreen(3000); // 3000
        setMediumScreen(3000); // 2991
    };
    const DesktopScreen = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: bigScreen });
        return isDesktop ? children : null;
    };
    const TabletScreen = ({ children }) => {
        const isTablet = useMediaQuery({
            minWidth: mediumScreen,
            maxWidth: bigScreen,
        });
        return isTablet ? children : null;
    };
    const MobileScreen = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: mediumScreen });
        return isMobile ? children : null;
    };
    // --------------------------------- RETURN -------------------------------------------
    return (React.createElement(Provider, { store: store },
        React.createElement("div", null,
            React.createElement(DesktopScreen, null,
                React.createElement(Suspense, { fallback: React.createElement("div", null, "Loading...") },
                    React.createElement(MainDesktop, { auto: viewAuto, desktop: viewDesktop, tablet: viewTablet, mobile: viewMobile, id: "viewdestktop" }))),
            React.createElement(TabletScreen, null,
                React.createElement(Container, { id: "tabletcontainer" },
                    React.createElement(Suspense, { fallback: React.createElement("div", null, "Loading...") },
                        React.createElement(MainTabletLeft, null),
                        React.createElement(MainTabletRight, { auto: viewAuto, desktop: viewDesktop, tablet: viewTablet, mobile: viewMobile, id: "viewtablet" })))),
            React.createElement(MobileScreen, null,
                React.createElement(Container, { id: "mobilecontainer" },
                    React.createElement(Suspense, { fallback: React.createElement("div", null, "Loading...") },
                        React.createElement(MainMobile, { auto: viewAuto, desktop: viewDesktop, tablet: viewTablet, mobile: viewMobile, id: "viewmobile" })))))));
}
//# sourceMappingURL=App.js.map