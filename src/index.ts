import 'dotenv/config';
import App from './app';
import Api from './route/api';
const PORT = 3000;
const app = new App();

// Add routes to the app
app.addRoutes([{ path: '/', router: Api }]);

// Start the server
app.listen(PORT);