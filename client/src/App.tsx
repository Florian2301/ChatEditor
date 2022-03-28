import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import React, { Suspense, useState } from 'react'

import { Container } from 'react-bootstrap'
import { Provider } from 'react-redux'
import { store } from './store'
import { useMediaQuery } from 'react-responsive'

const MainDesktop = React.lazy(() =>
  import('./modules/main/MainDesktop/MainDesktop')
)
const MainMobile = React.lazy(() =>
  import('./modules/main/MainMobile/MainMobile')
)
const MainTabletLeft = React.lazy(() =>
  import('./modules/main/MainTablet/MainTabletLeft')
)
const MainTabletRight = React.lazy(() =>
  import('./modules/main/MainTablet/MainTabletRight')
)

export default function App() {
  const [bigScreen, setBigScreen] = useState<number>(1400) // 1200
  const [mediumScreen, setMediumScreen] = useState<number>(1000) //768

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

  const DesktopScreen = ({ children } : { children: any }) => {
    const isDesktop = useMediaQuery({ minWidth: bigScreen })
    return isDesktop ? children : null
  }

  const TabletScreen = ({ children } : { children: any }) => {
    const isTablet = useMediaQuery({
      minWidth: mediumScreen,
      maxWidth: bigScreen,
    })
    return isTablet ? children : null
  }

  const MobileScreen = ({ children } : { children: any }) => {
    const isMobile = useMediaQuery({ maxWidth: mediumScreen })
    return isMobile ? children : null
  }

  // --------------------------------- RETURN -------------------------------------------

  return (
    <Provider store={store}>
      <div>
        <DesktopScreen>
          <Suspense fallback={<div>Loading...</div>}>
            <MainDesktop
              auto={viewAuto}
              desktop={viewDesktop}
              tablet={viewTablet}
              mobile={viewMobile}
              id="viewdestktop"
            />
          </Suspense>
        </DesktopScreen>

        <TabletScreen>
          <Container id="tabletcontainer">
            <Suspense fallback={<div>Loading...</div>}>
              <MainTabletLeft />
              <MainTabletRight
                auto={viewAuto}
                desktop={viewDesktop}
                tablet={viewTablet}
                mobile={viewMobile}
                id="viewtablet"
              />
            </Suspense>
          </Container>
        </TabletScreen>

        <MobileScreen>
          <Container id="mobilecontainer">
            <Suspense fallback={<div>Loading...</div>}>
              <MainMobile
                auto={viewAuto}
                desktop={viewDesktop}
                tablet={viewTablet}
                mobile={viewMobile}
                id="viewmobile"
              />
            </Suspense>
          </Container>
        </MobileScreen>
      </div>
    </Provider>
  )
}
