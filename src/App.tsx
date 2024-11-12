// TODO
// remove fgcontext if no context needed
// reimplement GA?

// fonts
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';

// Styles
import '../src/styles/reset.css';
import '../src/styles/sm-clean.css';
import '../src/styles/common.css';
import '../src/styles/style.css';
import '../src/styles/responsive.css';
import '../src/styles/global.css';
import '../src/styles/globalnew.css';

import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './components/views/NotFoundPage/NotFoundPage';
import ErrorBoundary, { ErrorFallbackComponent } from './ErrorBoundary';
import Navbar from './components/organisms/Navbar/Navbar';
// import { useFGContext } from './context/FGContext';

function App() {
  // useEffect(() => {
  //   ReactGA.send({
  //     hitType: 'pageview',
  //     page: location.pathname,
  //     title: location.pathname,
  //   });
  // }, [location]);

  return (
    <div id="content">
      <header role="banner">
        <ErrorBoundary Fallback={ErrorFallbackComponent}>
          <Navbar />
        </ErrorBoundary>
      </header>
      <main>
        <ErrorBoundary Fallback={ErrorFallbackComponent}>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <footer>
        <ErrorBoundary Fallback={ErrorFallbackComponent}>
          <Navbar />
        </ErrorBoundary>
      </footer>
    </div>
  );
}

export default App;
