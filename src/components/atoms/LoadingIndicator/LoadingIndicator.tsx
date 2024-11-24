// TODO
// Test this
// Figure out why motion was removed
// import { motion } from 'framer-motion';
import './LoadingIndicator.css';

type LoaderProps = {
  fadeOffLoader: boolean;
};

function Loader({ fadeOffLoader }: LoaderProps) {
  return (
    <div className={`preloader ${fadeOffLoader ? 'fadeOff' : ''}`}>
      <div className="loader" />
    </div>
  );
}
export default Loader;
