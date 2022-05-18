import { once } from 'node:events';
import Hero from '../entities/hero.js';
import { DEFAULT_HEADER } from '../utils/http.js';

const heroRoutes = ({ heroService }) => ({
  '/heroes:get': async (_, response) => {
    const heros = await heroService.find();

    response.writeHead(200, DEFAULT_HEADER);
    return response.end(JSON.stringify(heros));
  },

  '/heroes:post': async (request, response) => {
    const data = await once(request, 'data');
    const parsedData = JSON.parse(data);

    const hero = new Hero(parsedData);

    await heroService.create(hero);

    const result = JSON.stringify({
      success: 'User created with success',
      id: hero.id,
    });

    response.writeHead(201, DEFAULT_HEADER);
    response.write(result);
    return response.end();
  },
});

export { heroRoutes };
