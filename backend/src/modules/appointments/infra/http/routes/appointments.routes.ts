import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// Valida autenticacao com middlewares
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
// Mostra usuario logado
// console.log(request.user);

// Busca todos os registro
//  const appointements = await appointmentsRepository.find();

//  return response.json(appointements);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
