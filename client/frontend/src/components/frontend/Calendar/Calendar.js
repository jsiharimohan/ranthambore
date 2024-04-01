import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar() {
  return (
    <div className='n2rCalendar'>
        <FullCalendar
          defaultView="dayGridMonth"
          displayEventTime={true}
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
          }}
          editable={true}
          selectable={true}
          plugins={[ dayGridPlugin ]}
        />
    </div>
  )
}
