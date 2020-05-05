import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment'; // Pode criar um arquivo separado ORM e dto
import IAppointmenstRepository from '../repositories/IAppointmenstRepository';

/**
 * Recebimento das informacoes
 * Tratativa de erros/excessoes
 * Acesso ao repositorio
 */

interface IRequest {
  provider_id: string;
  date: Date;
}

/**
 * solid
 */

@injectable() // Injecao dependencia
export class CreateAppointmentService {
  // constructor(private appointmentsRepository: IAppointmenstRepository) {}

  constructor(
    @inject('AppointmentsRepository') // Injecao dependencia
    private appointmentsRepository: IAppointmenstRepository,
  ) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findappointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findappointmentInSameDate) {
      throw new AppError('This appointement is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
