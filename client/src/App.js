import React, {
  Component,
} from 'react';
import './custom.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Navbar, Footer, Landing } from './components/layout';
import { Login, Register } from './components/auth';
import store from './store';

class App extends Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <Router>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </Router>
        </Provider>
      </>
    );
  }
}

export default App;
