import React from 'react';
import { Spin } from 'antd';

export const LoaderWithOverLay = () => (
  <div className="Loader-Overlay">
    <div className="Overlay__Inner">
      <div className="Overlay__Content">
        <Spin size="large" />
      </div>
    </div>
  </div>
);

export default LoaderWithOverLay;
