import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import { Provider } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Container } from 'react-bootstrap'
import MainDesktop from './modules/MainDesktop'
import MainTabletLeft from './modules/MainTabletLeft'
import MainTabletRight from './modules/MainTabletRight'
import MainMobile from './modules/MainMobile'
import './App.css'
import SelectView from './modules/header/SelectView'
import Language from './modules/header/Language'
import Header from './modules/header/Header'

export default function App() {
  const [bigScreen, setBigScreen] = useState(1400) // 1200
  const [mediumScreen, setMediumScreen] = useState(1000) //768

  const viewAuto = () => {
    setBigScreen(1400) // 1200
    setMediumScreen(1000) // 768
  }

  const viewDesktop = () => {
    setBigScreen(1400) // 980
    setMediumScreen(1000) // 768
  }

  const viewTablet = () => {
    setBigScreen(3000) // 3000
    setMediumScreen(1000) // 768
  }

  const viewMobile = () => {
    setBigScreen(3000) // 3000
    setMediumScreen(3000) // 2991
  }

  const DesktopScreen = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: bigScreen })
    return isDesktop ? children : null
  }

  const TabletScreen = ({ children }) => {
    const isTablet = useMediaQuery({
      minWidth: mediumScreen,
      maxWidth: bigScreen,
    })
    return isTablet ? children : null
  }

  const MobileScreen = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: mediumScreen })
    return isMobile ? children : null
  }

  const [show, setShow] = useState(true)

  // --------------------------------- RETURN -------------------------------------------

  return (
    <Provider store={store}>
      <div>
        <DesktopScreen>
          <Header
            auto={viewAuto}
            desktop={viewDesktop}
            tablet={viewTablet}
            mobile={viewMobile}
            id="viewdestktop"
          />
          <MainDesktop />
        </DesktopScreen>

        <TabletScreen>
          {!show ? (
            <div id="show-options" onClick={() => setShow(!show)}>
              {show ? 'fade-out' : 'show options'}
            </div>
          ) : null}
          {show ? (
            <div id="tablet-header">
              <div id="fade-out-options" onClick={() => setShow(!show)}>
                {show ? 'fade-out' : 'show options'}
              </div>
              <Language id="tablet-language" />
              <SelectView
                auto={viewAuto}
                desktop={viewDesktop}
                tablet={viewTablet}
                mobile={viewMobile}
                id="viewtablet"
              />
            </div>
          ) : null}
          <Container id="flexTablet">
            <MainTabletLeft />
            <MainTabletRight />
          </Container>
        </TabletScreen>

        <MobileScreen>
          <Container id="flexMobile">
            <MainMobile
              auto={viewAuto}
              desktop={viewDesktop}
              tablet={viewTablet}
              mobile={viewMobile}
              id="viewmobile"
            />
          </Container>
        </MobileScreen>
      </div>
    </Provider>
  )
}
