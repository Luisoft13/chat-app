export default function({ store, redirect, error, route }) {
  const user = store.state.user.user
  console.log('user', user)
  if (!user && requireAuthentication(route))
    redirect('/login') // /login
}


function requireAuthentication(route) {
  // return !['/', '/about', '/login'].includes(route.path) // || !route.path.startswith('/error_')
  return ['/chat'].includes(route.path)
}

function requireAdmin(route) {
  return ['/admin'].includes(route.path)
}
