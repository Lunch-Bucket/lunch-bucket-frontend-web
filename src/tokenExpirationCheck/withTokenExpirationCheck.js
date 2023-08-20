import React, { useEffect } from "react";
import PATHS from "../common/paths/paths";

function withTokenExpirationCheck(WrappedComponent) {
  return function TokenExpirationCheck(props) {

    useEffect(() => {
      const authToken = localStorage.getItem("authToken");
      const tokenGeneratedTime = parseInt(localStorage.getItem("tokenGeneratedTime"), 10);

      if (!authToken || isNaN(tokenGeneratedTime)) {
            window.location.replace(PATHS.login); 
        return;
      }

      const currentTime = Date.now();
      const tokenExpiryTime = tokenGeneratedTime + 3550000;

      if (currentTime >= tokenExpiryTime) {
        window.location.replace(PATHS.login); 
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withTokenExpirationCheck;
