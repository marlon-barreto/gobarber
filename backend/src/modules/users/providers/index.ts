import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHastProvider from './HashProvider/implementations/BCryptHastProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHastProvider);
