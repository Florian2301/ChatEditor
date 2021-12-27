import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import { Provider } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Container } from 'react-bootstrap'
import MainDesktop from './modules/MainDesktop'
import MainTabletLeft from './responsive/MainTabletLeft'
import MainTabletRight from './responsive/MainTabletRight'
import MainMobile from './responsive/MainMobile'
import './App.css'
import SelectView from './modules/header/SelectView'
import Language from './modules/header/Language'
import Header from './modules/header/Header'

export default function App() {
  const [bigScreen, setBigScreen] = useState(1200)
  const [mediumScreen, setMediumScreen] = useState(768)

  const viewAuto = () => {
    setBigScreen(1200)
    setMediumScreen(768)
  }

  const viewDesktop = () => {
    setBigScreen(980)
    setMediumScreen(768)
  }

  const viewTablet = () => {
    setBigScreen(3000)
    setMediumScreen(768)
  }

  const viewMobile = () => {
    setBigScreen(3000)
    setMediumScreen(2991)
  }

  const DesktopScreen = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: bigScreen })
    return isDesktop ? children : null
  }

  const TabletScreen = ({ children }) => {
    const isTablet = useMediaQuery({
      minWidth: mediumScreen,
      maxWidth: bigScreen - 1,
    })
    return isTablet ? children : null
  }

  const MobileScreen = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: mediumScreen - 1 })
    return isMobile ? children : null
  }

  // --------------------------------- RETURN -------------------------------------------

  return (
    <Provider store={store}>
      <div
        style={{
          backgroundImage: 'url(/img/red_curtain.jpg)',
          width: '100%',
          height: '100vh',
        }}
      >
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
          <div id="tablet-header">
            <Language id="tablet-language" />
            <p className="start-para" id="tablet-advice">
              - recommended view is on a laptop/desktop screen -
            </p>
            <SelectView
              auto={viewAuto}
              desktop={viewDesktop}
              tablet={viewTablet}
              mobile={viewMobile}
              id="viewtablet"
            />
          </div>
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
