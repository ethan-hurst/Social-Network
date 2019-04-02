import React, {
  Component,
} from 'react';
import './custom.scss';
import { Navbar, Footer, Landing } from './components/layout';

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Landing />
        <Footer />
      </>
    );
  }
}

export default App;
