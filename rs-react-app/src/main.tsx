import ReactDOM from 'react-dom/client';
import { App } from './app/index';

export const root = document.querySelector('#root');

if (root) ReactDOM.createRoot(root).render(<App />);
