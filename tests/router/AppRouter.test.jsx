import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AppRouter } from "../../src/router/AppRouter"
import { useAuthStore } from "../../src/hooks/useAuthStore"

jest.mock("../../src/hooks/useAuthStore");

jest.mock("../../src/calendar", () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}));

describe('Test on <AppRouter/>', () => {
    
    const mockCheckAuthToken = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('should show loading page and called checkAuthToken', () => {

        useAuthStore.mockReturnValue({ 
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render(<AppRouter />);

        expect(screen.getByText('Cargando...')).toBeTruthy();
        expect( mockCheckAuthToken ).toHaveBeenCalled();
     });

    test('should show login if any user is authenticated', () => {

        useAuthStore.mockReturnValue({ 
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
            );

        expect( screen.getByText('Ingreso')).toBeTruthy();
        expect(container).toMatchSnapshot();
     });

    test('should show calendar with authenticated user', () => { 
        
        useAuthStore.mockReturnValue({ 
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
            );

        expect( screen.getByText('CalendarPage')).toBeTruthy();
    })
 })