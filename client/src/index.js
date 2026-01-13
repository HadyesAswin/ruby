import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
import App from './App';
import {QueryParamProvider} from 'use-query-params';

import './index.css';

const RouteAdapter = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate]
  );
  return children({ history: adaptedHistory, location });
};

ReactDOM.render(
  <Router>
    <QueryParamProvider ReactRouterRoute={RouteAdapter}>
      <App />
    </QueryParamProvider>
  </Router>,
  document.getElementById('root')
);
