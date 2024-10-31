import http, { IncomingMessage, ServerResponse } from 'http';
import { openStdin } from 'process';
import os from 'os';

// Définir l'interface TypeScript
interface ISystemInformation {
  hostname: string;
  platform: string;
  version : string;
  architecture: string;
  cpus: number;
  totalMemory: number;
  freeMemory: number;
  usedMemory: number;
  loadAverage: number[];
  uptime: number;
}

// Fonction pour obtenir les informations système
export const getSystemInformation = (): ISystemInformation => {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  return {
    hostname: require('os').hostname(),
    platform: process.platform,
    version: os.version(),
    architecture: process.arch,
    cpus: os.cpus().length,
    totalMemory: totalMemory,
    freeMemory: freeMemory,
    usedMemory: usedMemory,
    loadAverage: os.loadavg(),
    uptime: process.uptime()
  };
};

export const helloDude = (): string => {
    return 'Hello, server was created';
  };
