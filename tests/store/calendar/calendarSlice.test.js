import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";


describe('Test on calendarSlice', () => {

    test('should return default state', () => { 

        const state = calendarSlice.getInitialState();

        expect( state ).toEqual( initialState );

    });

    test('should onSetActiveEvent activate an event', () => { 

        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
        expect(state.activeEvent).toEqual( events[0] );
    });

    test('should add the new event with onAddNewEvent', () => { 

        const newEvent = {
            id: '3',
            start: new Date('2022-12-21 13:00:00'),
            end: new Date('2022-12-21 15:00:00'),
            title: 'English class',
            notes: 'CC session',
        }

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
        expect( state.events ).toEqual([ ...events, newEvent ]);

    });

    test('should update an event with onUpdateEvent', () => { 

        const updatedEvent = {
            id: '1',
            start: new Date('2022-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: 'Cumpleaños de Alicia actualizado',
            notes: 'Comprar pastel actaulizado',
        }

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ) );
        expect( state.events ).toContain(updatedEvent);

    });

    test('should onDeleteEvent delete active event', () => { 
        
        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() )
        expect( state.events ).not.toContain([ events[0] ]);
        expect( state.activeEvent ).toBe(null);

     });

    test('should onLoadEvents get events', () => { 
        
        const state = calendarSlice.reducer( initialState, onLoadEvents(events) );
        expect( state.isLoadingEvents ).toBeFalsy();
        expect( state.events ).toEqual(events);
        
        const newState = calendarSlice.reducer( initialState, onLoadEvents(events) );
        expect( state.events.length ).toBe(events.length);
     });

    test('should onLogoutCalendar clear state', () => { 
        
        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() )
        expect( state ).toEqual(initialState);

     })
 })