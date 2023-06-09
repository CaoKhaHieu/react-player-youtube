import ReactDOM from 'react-dom/client';
import App from './App';
import { VideoPlayerProvider } from 'react-player-youtube';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <VideoPlayerProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </VideoPlayerProvider>,
);
