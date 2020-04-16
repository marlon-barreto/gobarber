import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { CreateAppointmentService } from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

// Soc Separation of Concerns

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  // Busca todos os registro
  const appointements = await appointmentsRepository.find();

  return response.json(appointements);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
