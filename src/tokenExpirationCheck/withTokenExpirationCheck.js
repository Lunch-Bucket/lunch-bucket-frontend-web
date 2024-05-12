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

      
      // const handleUnload = () => {
      //   localStorage.setItem('loginStatus', true);
      // };
      
      // window.addEventListener("unload", handleUnload);
      
      if (currentTime >= tokenExpiryTime) {
        localStorage.setItem('loginStatus', false);
        // window.removeEventListener("beforeunload", handleUnload);
        window.location.replace(PATHS.login); 
      }
      
      // return () => {
      //   window.removeEventListener("unload", handleUnload);
      // };
      
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withTokenExpirationCheck;
