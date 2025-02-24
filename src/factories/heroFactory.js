import HeroRepository from '../repositories/heroRepository.js';
import HeroService from '../services/heroService.js';

const generateHeroServiceInstance = ({ filePath }) => {
  const heroRepository = new HeroRepository({ file: filePath });
  const heroService = new HeroService({ heroRepository });
  return heroService;
};

export { generateHeroServiceInstance };
