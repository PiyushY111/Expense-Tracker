import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

console.log('Starting application initialization...');

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element not found! Make sure there is a div with id="root" in your index.html');
} else {
  console.log('Root element found, creating React root...');
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React app mounted successfully');
}
