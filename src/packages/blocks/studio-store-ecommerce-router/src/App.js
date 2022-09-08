// App.js - WEB
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTopButton from 'react-scroll-to-top';
import WebRoutes from './WebRoutes';
import { ToastContainer } from 'react-toastify';

class App extends Component {
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ loader: true });
  }

  render() {
    return (
      <div className='d-flex flex-column h-100'>
        <WebRoutes />
        <ScrollToTopButton smooth top={200} />
        <ToastContainer />
      </div>
    );
  }
}

export default App;