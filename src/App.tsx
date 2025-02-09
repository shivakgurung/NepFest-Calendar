import { BrowserRouter } from 'react-router-dom'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Navbar from './components/navbar/Navbar'
import AppRoutes from './routes/Routes'
import Footer from './components/Footer/Footer'
import { CalendarProvider } from './context/CalendarContext'

function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <CalendarProvider>
            <div className="relative bg-stone-50 pb-12 h-[100%] w-[100vw]">
              <div className="bg-sky-400 w-full sm:w-40 h-40 rounded-full absolute top-1 opacity-20 max-sm:right-0 sm:left-56 z-0"></div>
            <div className="bg-emerald-500 w-full sm:w-40 h-24 absolute top-0 -left-0 opacity-20 z-0"></div>
            <div className="bg-purple-600 w-full sm:w-40 h-24 absolute top-40 -left-0 opacity-20 z-0"></div>

              <div className="w-full relative  backdrop-blur-3xl">

                {/* <div className="w-full max-w-7xl mx-auto px-2 lg:px-8 flex justify-center  "> */}
                <Navbar />
                <div className="py-8">
                  <AppRoutes />
                </div>
                <Footer />
                {/* </div> */}

              </div>
            </div>
          </CalendarProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  )
}

export default App
