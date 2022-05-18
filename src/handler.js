import { parse } from 'node:url';
import { errorHandler } from './utils/http.js';
import { routes } from './routes/index.js';

function handler(request, response) {
  const { url, method } = request;
  const { pathname } = parse(url, true);
  const routerKey = `${pathname}:${method.toLowerCase()}`;

  const chosenRouter = routes[routerKey] || routes.default;

  return Promise.resolve(chosenRouter(request, response)).catch(
    errorHandler(response)
  );
}

export default handler;
