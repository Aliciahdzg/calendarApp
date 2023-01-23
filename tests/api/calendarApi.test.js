import calendarApi from "../../src/api/calendarApi"


describe('Test on calendarApi', () => { 

    test('Should have default configuration', () => {

        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL )
    });
    
    test('should exist x-token on header in all request', async() => { 

        const token = 'ABC-123-XYZ'
        localStorage.setItem('token', token);
        const res = await calendarApi.get('/auth');

        expect(res.config.headers['x-token']).toBe(token);

     })
 })