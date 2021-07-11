export default function ({ redirect, store, route }) {
  const isAuthenticated = !!store.state.auth.authUser
  if (route.name === 'index') return
  if (route.name === 'Signup') return
  if (!isAuthenticated && route.name !== 'index') {
    redirect({ name: 'index', query: { login: false }, replace: true })
  }
}
