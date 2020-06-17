import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';

import { isToday, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Hearder,
  HearderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointmet,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailability {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [monthAvailability, setmonthAvailability] = useState<
    MonthAvailability[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setmonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  useEffect(() => {
    api
      .get('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAppointments(response.data);
      });
  }, [selectedDate]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectedDate]);

  return (
    <Container>
      <Hearder>
        <HearderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem-Vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HearderContent>
      </Hearder>

      <Content>
        <Schedule>
          <h1>Horaios agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src={user.avatar_url} alt={user.name} />

              <strong>{user.name}</strong>
              <span>
                <FiClock /> 08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manha</strong>

            <Appointmet>
              <span>
                <FiClock /> 08:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />

                <strong>{user.name}</strong>
              </div>
            </Appointmet>

            <Appointmet>
              <span>
                <FiClock /> 09:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />

                <strong>{user.name}</strong>
              </div>
            </Appointmet>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointmet>
              <span>
                <FiClock /> 14:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />

                <strong>{user.name}</strong>
              </div>
            </Appointmet>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Marco',
              'Abril',
              'Maio',
              'Junho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
