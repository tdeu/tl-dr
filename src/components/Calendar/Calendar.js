// integrate supabase
import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', time: '' });

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const currentDateObj = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDateObj));
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Event management
  const addEvent = () => {
    if (newEvent.title.trim() && selectedDate) {
      const dateKey = selectedDate.toISOString().split('T')[0];
      const updatedEvents = {
        ...events,
        [dateKey]: [...(events[dateKey] || []), { ...newEvent, id: Date.now() }]
      };
      setEvents(updatedEvents);
      setNewEvent({ title: '', description: '', time: '' });
      setShowEventForm(false);
    }
  };

  const deleteEvent = (dateKey, eventId) => {
    const updatedEvents = {
      ...events,
      [dateKey]: events[dateKey].filter(event => event.id !== eventId)
    };
    setEvents(updatedEvents);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentMonth;
  };

  const getEventsForDate = (date) => {
    const dateKey = date.toISOString().split('T')[0];
    return events[dateKey] || [];
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <h2 className={styles.calendarTitle}>Calendar</h2>
        <div className={styles.navigation}>
          <button onClick={goToPreviousMonth} className={styles.navButton}>
            ‹
          </button>
          <h3 className={styles.currentMonth}>
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button onClick={goToNextMonth} className={styles.navButton}>
            ›
          </button>
        </div>
        <button onClick={goToToday} className={styles.todayButton}>
          Today
        </button>
      </div>

      <div className={styles.calendarGrid}>
        <div className={styles.dayHeaders}>
          {dayNames.map(day => (
            <div key={day} className={styles.dayHeader}>
              {day}
            </div>
          ))}
        </div>
        
        <div className={styles.daysGrid}>
          {calendarDays.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
            
            return (
              <div
                key={index}
                className={`${styles.day} ${
                  !isCurrentMonth(day) ? styles.otherMonth : ''
                } ${isToday(day) ? styles.today : ''} ${
                  isSelected ? styles.selected : ''
                }`}
                onClick={() => handleDateClick(day)}
              >
                <span className={styles.dayNumber}>{day.getDate()}</span>
                {dayEvents.length > 0 && (
                  <div className={styles.eventIndicators}>
                    {dayEvents.slice(0, 3).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={styles.eventIndicator}
                        title={event.title}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className={styles.moreEvents}>+{dayEvents.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Form */}
      {showEventForm && selectedDate && (
        <div className={styles.eventFormOverlay}>
          <div className={styles.eventForm}>
            <h3>Add Event for {selectedDate.toDateString()}</h3>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className={styles.eventInput}
            />
            <textarea
              placeholder="Description (optional)"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className={styles.eventTextarea}
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              className={styles.eventInput}
            />
            <div className={styles.eventFormButtons}>
              <button onClick={addEvent} className={styles.addEventButton}>
                Add Event
              </button>
              <button 
                onClick={() => setShowEventForm(false)} 
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      {selectedDate && getEventsForDate(selectedDate).length > 0 && (
        <div className={styles.eventsList}>
          <h3>Events for {selectedDate.toDateString()}</h3>
          {getEventsForDate(selectedDate).map((event) => (
            <div key={event.id} className={styles.eventItem}>
              <div className={styles.eventInfo}>
                <h4>{event.title}</h4>
                {event.description && <p>{event.description}</p>}
                {event.time && <span className={styles.eventTime}>{event.time}</span>}
              </div>
              <button
                onClick={() => deleteEvent(selectedDate.toISOString().split('T')[0], event.id)}
                className={styles.deleteEventButton}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
