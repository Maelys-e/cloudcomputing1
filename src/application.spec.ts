import { helloDude } from './application';
import { getSystemInformation } from './application';

describe('typeScript test suite', () => {
  it('should return a JSON object', () => {
    expect.assertions(1);
    // indique que le test doit contenir une assertion (pour vérifier que le test a bien été exécuté)
    const systemInfo = getSystemInformation();
    expect(typeof systemInfo).toBe('object');
    // le test en lui-même
  });
  // définit le test unitaire : si getSystemInformation() retourne bien un objet JSON
  it('should be an integer', () => {
    expect.assertions(1);
    const nb_cpus = getSystemInformation().cpus;
    expect(typeof nb_cpus).toBe('number');
  });
  it('should be equal to the sum of memories', () => {
    expect.assertions(1);
    const total_memory = getSystemInformation().freeMemory + getSystemInformation().usedMemory;
    expect(total_memory).toBe(getSystemInformation().totalMemory);
  });
  it('should be a desktop', () => {
    expect.assertions(1);
    const host_name = getSystemInformation().hostname;
    expect(host_name.toLowerCase().includes('desktop')).toBe(true);
  });
});
// regroupe des tests unitaires similaires, en l'occurrence les "typeScript test suite"
