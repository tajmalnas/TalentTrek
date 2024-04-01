import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {app} from '../src/firebase/firebaseConfig.js';
import 'regenerator-runtime/runtime';

console.log(app)
if (!app) {
  console.error('Firebase app is not initialized');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
      <App />
      </Provider>
    </PersistGate>
    </Router>
  </React.StrictMode>,
)
