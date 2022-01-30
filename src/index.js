import React from 'react';
import ReactDOM from 'react-dom';
import Theme from "./theme";
import Router from "./router";
import Auth from "./services/auth/Auth";
import Store from "./store";

ReactDOM.render(
    <React.StrictMode>
        <Store>
              <Auth>
                  <Theme>
                      <Router/>
                  </Theme>
              </Auth>
        </Store>
    </React.StrictMode>,
    document.getElementById('root')
);


