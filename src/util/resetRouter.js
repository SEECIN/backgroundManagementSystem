import router from "@/router/index"
import VueRouter from 'vue-router'

export function resetRouter() {
  const newRoutes = router.options.routes
  newRoutes[1].children.splice(1, newRoutes[1].children.length - 1)
  router.matcher = new VueRouter({
    routes: newRoutes
  }).matcher
}
