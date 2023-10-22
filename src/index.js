import React, {Component, Suspense} from 'react';
import ReactDOM from 'react-dom';


import './main.scss';

import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import InclusifyRoutes from "./router/InclusifyRoutes";
import Load from "./components/Load";

class Root extends Component{
  render(){
      return(
          <BrowserRouter basename={'/'}>
                <Suspense fallback={<Load/>}>
                      <InclusifyRoutes/>
                </Suspense>
          </BrowserRouter>
      )
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
serviceWorker.register();