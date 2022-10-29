export function filterRoutes(routes, roleAuth) {
  return routes.filter(item => {
    if (!item.children && roleAuth.includes(item.meta.id)) {
      return item
    }
    if (item.children) {
      item.children = filterRoutes(item.children, roleAuth)
      return item.children.length > 0
    }
  })
}
