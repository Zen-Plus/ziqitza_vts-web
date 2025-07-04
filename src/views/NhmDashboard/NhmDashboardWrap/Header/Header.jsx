import React from 'react';
import Logo from '../../../../components/Logo';


function Header() {
  return (
    <div className="Header_Wrapper">
      <div className="Header container H-100">
        <div className="row d-flex justify-content-between H-100">
          <div className="col-sm-4 col-md-3 col-4 d-flex justify-content-between Flex-Direction-Column p-2">
            <Logo height={20} width="145px" src="/biharNhmDashboard/zenplus-logo.png" className="img img-responsive" />
            {/* <Logo src="/upNhmDashboard/bihar-cm-pic.png" className="img img-responsive Header_Logo" /> */}
          </div>
          {/* <div className="col-3 p-2 d-flex justify-content-end Mr-20">
            <Logo src="/govt-logo_BIHAR.jpg" width={63} height={63} className="img img-responsive Mr-20" />
            <Logo src="/102-logo.png" width={63} height={63} className="img img-responsive" />
          </div> */}
        </div>
      </div>
    </div>
  );
}


export default Header;

