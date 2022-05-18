import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_HEADER } from '../utils/http.js';
import { generateHeroServiceInstance } from '../factories/heroFactory.js';
import { heroRoutes } from './heroRoutes.js';

// path
const currentDir = dirname(fileURLToPath(import.meta.url));
const filePath = join(currentDir, '../../database/data.json');

// inicialize hero service
const heroService = generateHeroServiceInstance({ filePath });

// routes
const routes = {
  ...heroRoutes({ heroService }),

  // 404
  default: async (request, response) => {
    response.writeHead(404, DEFAULT_HEADER);
    response.end(JSON.stringify({ message: 'Not Found' }));
  },
};

export { routes };
