import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
export class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findappointment = await this.findOne({
      where: { date },
    });

    return findappointment || null;
  }
}

export default AppointmentsRepository;