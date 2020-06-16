import React, { useState } from 'react';
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

const Dashboard: React.FC = () => {
  const [selectDate, setSelectDate] = useState(new Date());

  const { signOut, user } = useAuth();

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
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
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
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
