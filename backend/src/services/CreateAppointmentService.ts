import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

/**
 * Recebimento das informacoes
 * Tratativa de erros/excessoes
 * Acesso ao repositorio
 */

interface Request {
  provider: string;
  date: Date;
}

/**
 * solid
 */

export class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findappointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findappointmentInSameDate) {
      throw Error('This appointement is already booked');
    }

    // Salva objeto na memoria
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    // Salva no banco de dados
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
