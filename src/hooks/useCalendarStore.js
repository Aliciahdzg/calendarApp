import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from '../store';

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { user } = useSelector( state => state.auth );
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
      dispatch( onSetActiveEvent(calendarEvent) );
    }

    const startSavingEvent = async( calendarEvent ) => {
      // TODO: llegar al backend update event
      try {

        if( calendarEvent.id ) {
          // Actualizado
          await calendarApi.put( `/events/${ calendarEvent.id }`, calendarEvent );
          dispatch( onUpdateEvent({ ...calendarEvent, user }) );
          return;
        } 
        // Creando
        const { data } = await calendarApi.post('/events', calendarEvent);
        console.log(data)
        dispatch( onAddNewEvent( { ...calendarEvent, id: data.event.id, user } ) ); 
        
      } catch (error) {
        console.log(error)
        Swal.fire('Error al guardar', error.response.data.msg, 'error')
      }
       // Todo bien
      
    };

    const startDeletingEvent = async() => {
      // TODO: Llegar al backend
      try {

        await calendarApi.delete( `/events/${ activeEvent.id }` );
        dispatch( onDeleteEvent() );

      } catch (error) {
        console.log(error);
        Swal.fire('Error al eliminar', error.response.data.msg, 'error')
      }
  
    }
    
    const startLoadingEvents = async() => {
      try {

        const { data } = await calendarApi.get('/events');
        const events = convertEventsToDateEvents( data.events );

        dispatch( onLoadEvents(events) );
        
      } catch (error) {
        console.log('Error downloading events')
      }
    }
  
    return {
        // * Properties
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        // * Methods
        startDeletingEvent,
        setActiveEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}
