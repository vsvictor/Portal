import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NewsView from '@/views/NewsView.vue'
import VacanciesView from '@/views/VacanciesView.vue'
import AboutView from '@/views/AboutView.vue'
import ServicesView from '@/views/ServicesView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactsView from '@/views/ContactsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/news/:id',
      name: 'news-detail',
      //component: () => import('@/views/NewsDetailView.vue'),
      component: NewsView,
    },
    {
      path: '/vacancies/:id',
      name: 'vacancy-detail',
      //component: () => import('@/views/VacancyDetailView.vue'),
      component: VacanciesView,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
