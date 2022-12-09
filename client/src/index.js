import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import PDF from "./components/PdfViewer/PdfViewer"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <App />
  // {/* <PDF /> */ }
  // </React.StrictMode>
);

