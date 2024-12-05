// TODO
// remove fgcontext if no context needed
// tracking like GA but easier

// fonts
import '@fontsource/open-sans/400.css'; // Regular
import '@fontsource/open-sans/600.css'; // SemiBold
import '@fontsource/open-sans/700.css'; // Bold
import '@fontsource/open-sans/800.css'; // ExtraBold
import '@fontsource/nunito/400.css'; // Regular
import '@fontsource/nunito/600.css'; // SemiBold
import '@fontsource/nunito/700.css'; // Bold
import '@fontsource/nunito/800.css'; // ExtraBold
import '@fontsource/nunito/900.css'; // Black

// Styles
import './styles/reset.scss';
import './styles/global.scss';

import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './components/views/NotFoundPage/NotFoundPage';
import { ErrorBoundary, ErrorFallbackComponent } from './ErrorBoundary';
import StickyHeader from './components/organisms/StickyHeader/StickyHeader';
import Landing from './components/views/Landing/Landing';
import Footer from './components/organisms/Footer/Footer';
import ScrollProgressIndicator2 from './components/atoms/ScrollProgressIndicator/ScrollProgressIndicator2';

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
      <ErrorBoundary Fallback={ErrorFallbackComponent}>
        <StickyHeader />
        <ScrollProgressIndicator2 />
      </ErrorBoundary>
      <main>
        <ErrorBoundary Fallback={ErrorFallbackComponent}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <footer>
        <ErrorBoundary Fallback={ErrorFallbackComponent}>
          <Footer />
        </ErrorBoundary>
      </footer>
    </div>
  );
}

export default App;
