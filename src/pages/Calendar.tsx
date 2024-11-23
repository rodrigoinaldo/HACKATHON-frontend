import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { CalendarApp, createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/calendar.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Calendar = () => {
  const [events, setEvents] = useState<any>({}); // Alterado para armazenar os eventos como objeto

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/reserva/index')
      .then(response => {
        console.log(response.data);
        const reservas = response.data.reservas;

        // Transformando o array de eventos em um objeto
        const eventosObjeto = reservas.reduce((acc: any, reserva: any) => {
          const evento = {
            id: reserva.id,
            title: reserva.ambiente,  // Nome do ambiente ou título do evento
            start: `${reserva.data_reserva}T${reserva.hora_inicio}`,  // Concatenando data e hora de início
            end: `${reserva.data_reserva}T${reserva.hora_fim}`,  // Concatenando data e hora de fim
          };
          acc[reserva.id] = evento; // Usando o id como chave
          return acc;
        }, {});

        console.log(eventosObjeto);

        setEvents(eventosObjeto);  // Atualizando o estado com o objeto de eventos
      })
      .catch(error => {
        console.error('Erro ao carregar reservas:', error);
      });
  }, []); // O efeito será executado uma vez quando o componente for montado

  // Inicializando o calendário com a lista de eventos transformados
  const calendar: CalendarApp = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],

    events: Object.values(events),  // Convertendo o objeto de eventos de volta para um array
  });

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default Calendar;
