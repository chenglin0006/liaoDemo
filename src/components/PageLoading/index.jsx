/*eslint-disable */
import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import loadingJson from './data.json';
import './index.less';

let myLottie = null;

const Loader = ({ spinning }) => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector('.todoLottieLoading'),
      renderer: 'svg',
      loop: true,
      animationData: loadingJson,
      canvasStyle: { width: 20, hight: 20 },
    });
  }, []);

  return (
    <div className="todoCommonLoading">
      <div className="todoLottieLoading" />
    </div>
  );
};
export default Loader;
