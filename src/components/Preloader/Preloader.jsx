import PropTypes from 'prop-types';
import PuffLoader from 'react-spinners/PuffLoader';
import style from './Preloader.module.css';

export const Preloader = ({ color }) => (
  <div className={style.preloaderOverlay}>
    <div className={style.loader}>
      <div className={style.wrapper}>
        <PuffLoader color={color} style={{ display: 'block' }} size={100} />
      </div>
    </div>
  </div>
);

Preloader.propTypes = {
  color: PropTypes.string,
};
