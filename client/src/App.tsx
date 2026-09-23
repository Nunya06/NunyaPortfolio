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
import AdminServices from './Pages/Admin/AdminServices'
import AdminTestimonial from './Pages/Admin/AdminTestimonial'
import AdminServicesForm from './Pages/Admin/AdminServicesForm'
import AdminTestimonialForm from './Pages/Admin/AdminTestimonialForm'
import AdminAbout from './Pages/Admin/AdminAbout'
import AdminContact from './Pages/Admin/AdminContact'
import AdminSkillForm from './Pages/Admin/AdminSkillForm'
import AdminExperienceForm from './Pages/Admin/AdminExperienceForm'
import AdminHero from './Pages/Admin/AdminHero'
import AdminMessages from './Pages/Admin/AdminMessages'
import NotFound from './Pages/NotFound'


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
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<AdminProjectForm />} />
          <Route path="projects/:id" element={<AdminProjectForm />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="services/new" element={<AdminServicesForm />} />
          <Route path="services/:id" element={<AdminServicesForm />} />
          <Route path="testimonials" element={<AdminTestimonial />} />
          <Route path="testimonials/new" element={<AdminTestimonialForm />} />
          <Route path="testimonials/:id" element={<AdminTestimonialForm />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="about/skills/new" element={<AdminSkillForm />} />
          <Route path="about/skills/:id" element={<AdminSkillForm />} />
          <Route path="about/experience/new" element={<AdminExperienceForm />} />
          <Route path="about/experience/:id" element={<AdminExperienceForm />} />
          <Route path="contact" element={<AdminContact />} />
          <Route path="hero" element={<AdminHero />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>

        {/* 404 - Catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  )
}

export default App
