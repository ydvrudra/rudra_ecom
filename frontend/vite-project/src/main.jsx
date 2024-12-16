import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import {store,persistor} from './redux/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { positions,transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options  = {
   timeout:5000,
   position: positions.TOP_CENTER,
   transitions:transitions.SCALE,
};


createRoot(document.getElementById('root')).render(
   <Provider store={store}>
   <AlertProvider template={AlertTemplate} { ...options}>
   <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </StrictMode>,
   </AlertProvider>
   </Provider>
)
