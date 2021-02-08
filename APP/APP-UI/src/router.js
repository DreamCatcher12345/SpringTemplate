import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddEmployee from './views/AddEmployee.vue'
import AddModule from './views/AddModule.vue'
import SearchEmployee from "./views/SearchEmployee";
import AddCourse from "./views/AddCourse";
import AddTrainer from "./views/AddTrainer";
import SearchTrainer from "./components/trainer/SearchTrainer";
import SearchCourses from "./views/SearchCourses";
import EditEmployee from "./views/EditEmployee";
import CourseDetailView from "./views/CourseDetailView";
import EditCourse from "./views/EditCourse"
import ModuleDetailView from "./views/ModuleDetailView";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/employee/add',
      name: "addEmployee",
      component: AddEmployee
    },
    {
      path: '/module/add',
      name: "addModule",
      component: AddModule
    },
    {
      path: '/employee/search',
      name: 'searchEmployee',
      component: SearchEmployee
    },
    {
      path: '/course/add',
      name: "addCourse",
      component: AddCourse
    },
    {
      path: '/trainer/add',
      name: 'addTrainer',
      component: AddTrainer
    },
    {
      path: '/trainer/search',
      name: 'searchTrainer',
      component: SearchTrainer
    },
    {
      path: '/courses',
      name: 'searchCourses',
      component: SearchCourses,
    },
    {
      path: '/employee/edit/:employee',
      name: 'editEmployee',
      component: EditEmployee,
      props: true
    },
    {
      path: "/courses/details",
      name: 'courseDetailView',
      component: CourseDetailView,
      props: true
    },
    {
      path: "/courses/edit",
      name: "editCourse",
      component: EditCourse,
      props: true
    },
    {
      path: "/module/details/:id",
      name: 'moduleDetailView',
      component: ModuleDetailView,
      props: true
    }
  ]
})
