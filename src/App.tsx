import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import { ROUTES, routeComponents } from './constants/routes'

function App() {

  return (
    <>
      <Router>
        <MainLayout>
          <Routes>
            {ROUTES.map(item => {
              const Component = routeComponents[item.name];
              return <Route key={item.name} path={item.route} element={<Component />} />
            })}
          </Routes>
        </MainLayout>
      </Router>
    </>
  )
}

export default App
