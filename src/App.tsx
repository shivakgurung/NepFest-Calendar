import './App.css'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Home from './pages/Home'

function App() {
  return (
    <>
      <ErrorBoundary>
        <body className="relative bg-stone-50">
          <div className="bg-sky-400 w-full sm:w-40 h-40 rounded-full absolute top-1 opacity-20 max-sm:right-0 sm:left-56 z-0"></div>
          <div className="bg-emerald-500 w-full sm:w-40 h-24 absolute top-0 -left-0 opacity-20 z-0"></div>
          <div className="bg-purple-600 w-full sm:w-40 h-24 absolute top-40 -left-0 opacity-20 z-0"></div>
          <div className="w-full py-24 relative z-10 backdrop-blur-3xl">



            <Home />

          </div>
        </body>
      </ErrorBoundary>
    </>
  )
}

export default App
