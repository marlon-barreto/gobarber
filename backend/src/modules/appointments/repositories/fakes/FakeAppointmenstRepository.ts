import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmenstRepository from '@modules/appointments/repositories/IAppointmenstRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

export class AppointmentsRepository implements IAppointmenstRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    // Object.assign(appointment, { id: uuid(), date, provider_id });

    // // # Ou codigo abaixo
    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
