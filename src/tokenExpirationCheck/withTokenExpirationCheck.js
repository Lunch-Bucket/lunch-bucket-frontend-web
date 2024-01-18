import React, { useEffect } from "react";
import PATHS from "../common/paths/paths";

function withTokenExpirationCheck(WrappedComponent) {
  return function TokenExpirationCheck(props) {

    useEffect(() => {
      const authToken = localStorage.getItem("lb_auth_token");
      const tokenGeneratedTime = parseInt(localStorage.getItem("tokenGeneratedTime"), 10);

      if (!authToken || isNaN(tokenGeneratedTime)) {
            window.location.replace(PATHS.login); 
        return;
      }

      const currentTime = Date.now();
      const tokenExpiryTime = tokenGeneratedTime + 3550000;

      if (currentTime >= tokenExpiryTime) {
        localStorage.setItem('loginStatus', false);
        window.location.replace(PATHS.login); 
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withTokenExpirationCheck;
