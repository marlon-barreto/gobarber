import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

/**
 * Recebimento das informacoes
 * Tratativa de erros/excessoes
 * Acesso ao repositorio
 */

interface Request {
  provider_id: string;
  date: Date;
}

/**
 * solid
 */

export class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findappointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findappointmentInSameDate) {
      throw new AppError('This appointement is already booked');
    }

    // Salva objeto na memoria
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // Salva no banco de dados
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
