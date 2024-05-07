import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';
import './TrainingCalendar.css';

const TrainingCalendar = ({ trainings }) => {
  const events = [];
  const calendarRef = useRef(null);

  trainings.forEach(training => {
    const startDate = moment(training.start);
    const endDate = moment(training.end);

    while (startDate.isSameOrBefore(endDate, 'day')) {
      const startTime = startDate.clone().startOf('day').add(training.start.getHours(), 'hours').add(training.start.getMinutes(), 'minutes');
      const endTime = startDate.clone().startOf('day').add(training.end.getHours(), 'hours').add(training.end.getMinutes(), 'minutes');

      events.push({
        title: `Training ${training.trainingId}`,
        start: startTime.format(),
        end: endTime.format()
      });

      startDate.add(1, 'day');
    }
  });

  const changeView = (view) => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(view);
    }
  };

  const eventContent = ({ event }) => {
    const isMultiDay = event.start.toDateString() !== event.end.toDateString();

    return (
      <div className="event-content">
        <strong>{event.title}</strong>
        <br />
        {isMultiDay ? (
          <>
            {event.start.toLocaleTimeString()} - <br />
            {event.end.toLocaleTimeString()}
          </>
        ) : (
          <>
            {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
          </>
        )}
      </div>
    );
  };

  const handleDateClick = (arg) => {
    const date = arg.date;
    const dateString = moment(date).format('YYYY-MM-DD');
    changeView('timeGridDay');
    calendarRef.current.getApi().gotoDate(dateString);
  };

  return (
    <>
      <div className="calendar-buttons">
        <h1>Training Schedule Calendar</h1>
        <button onClick={() => changeView('dayGridMonth')}>Monthly</button>
        <button onClick={() => changeView('timeGridWeek')}>Weekly</button>
        <button onClick={() => changeView('timeGridDay')}>Daily</button>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        views={{
          dayGridMonth: {
            type: 'dayGridMonth',
            duration: { months: 1 },
            buttonText: 'Month'
          },
          timeGridWeek: {
            type: 'timeGridWeek',
            duration: { weeks: 1 },
            buttonText: 'Week'
          },
          timeGridDay: {
            type: 'timeGridDay',
            duration: { days: 1 },
            buttonText: 'Day'
          }
        }}
        events={events}
        eventContent={eventContent}
        dateClick={handleDateClick}
      />
    </>
  );
};

export default TrainingCalendar;
