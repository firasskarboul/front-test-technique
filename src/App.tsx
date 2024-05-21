import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import { ACCESS_TYPES, ROUTES, routeComponents } from './constants/routes'
import PrivateRoute from './components/PrivateRoute'
import { useAuth } from './hooks/useAuth'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'

function App() {

  useAuth();

  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Router>
        <MainLayout>
          <Routes>
            {ROUTES.map(item => {
              const Component = routeComponents[item.component];
              const element = <Component />

              if (item.access === ACCESS_TYPES.PRIVATE) {
                return (<Route
                  key={item.name}
                  path={item.route}
                  element={<PrivateRoute element={element} isAuthenticated={token} />}
                />)
              } else {
                return <Route key={item.name} path={item.route} element={element} />;
              }
            })}
          </Routes>
        </MainLayout>
      </Router>
    </>
  )
}

export default App
