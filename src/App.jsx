function App() {
  return (
    <div className="container">
      <h1>🚀 Deployed via GitHub Actions → ECR → ECS</h1>
      <p>This is a React app, built with Vite, containerized, and deployed as a real image pipeline.</p>
      <p className="build-info">Build: {import.meta.env.VITE_BUILD_NUMBER || 'local'}</p>
    </div>
  )
}

export default App
