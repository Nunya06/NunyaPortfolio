import { Route, Routes } from 'react-router-dom'
import AppLayout from './Pages/AppLayout'
import Home from './Pages/Home'
import AboutMe from './Pages/AboutMe'
import Projects from './Pages/Projects'
import ProjectPage from './Pages/ProjectPage'
import Contact from './Pages/Contact'
import AdminLayout from './Pages/Admin/AdminLayout'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AdminProjects from './Pages/Admin/AdminProjects'
import AdminProjectForm from './Pages/Admin/AdminProjectForm'
import Login from './Pages/Login'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  return (
    <>
      <Routes>

        <Route path="/access" element={<Login />} />

        <Route path='/' element={<AppLayout />} >
          <Route index element={<Home />} />
          <Route path="about-me" element={<AboutMe />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project/:id" element={<ProjectPage />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin pages */}
        <Route path="/superAdmin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<AdminProjectForm />} />
          <Route path="projects/:id" element={<AdminProjectForm />} />


        </Route>

      </Routes>
    </>
  )
}

export default App
