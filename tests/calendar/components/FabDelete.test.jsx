import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { useCalendarStore } from "../../../src/hooks";
import { uiSlice } from "../../../src/store";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

jest.mock("../../../src/hooks/useCalendarStore")

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer,
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}

describe('Test on <FabDelete />', () => { 

    const mockStartDeletingEvent = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('should show the component', () => { 

        const mockStore = getMockStore({ isDateModalOpen: false })

        useCalendarStore.mockReturnValue({ 
            hasEventSelected: false,
        });

        render(
            <Provider store={mockStore}>
                <FabDelete />
            </Provider>
        );

        const btn = screen.getByLabelText('btn-delete');
        expect(btn.classList).toContain('btn');
        expect(btn.classList).toContain('btn-danger');
        expect(btn.classList).toContain('fab-danger');
        expect( btn.style.display ).toBe('none');

     });

     test('should show button when a event is active', () => { 

        const mockStore = getMockStore({ isDateModalOpen: false })

        useCalendarStore.mockReturnValue({ 
            hasEventSelected: true,
        });

        render(
            <Provider store={mockStore}>
                <FabDelete />
            </Provider>
        );

        const btn = screen.getByLabelText('btn-delete');
        expect( btn.style.display ).toBe('');

     });

     test('should called startDeletingEvent if the event is active', () => { 

        const mockStore = getMockStore({ isDateModalOpen: false })

        useCalendarStore.mockReturnValue({ 
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        });

        render(
            <Provider store={mockStore}>
                <FabDelete />
            </Provider>
        );

        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click(btn);

        expect( mockStartDeletingEvent ).toHaveBeenCalled();

     });
 })