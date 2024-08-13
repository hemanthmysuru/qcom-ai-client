import apiService from "../core/apiService";
import { UserType } from "../types/user.type";

const mockUser: UserType = {
    firstName: 'Peter',
    lastName: 'Bishop',
    email: 'admin@example.com',
    phoneNumber: '123-456-7890',
    username: 'admin',
    designation: 'Ops Manager'
};

class AuthService {

    public async getUserById(id: number): Promise<UserType> {
        return await apiService.get<UserType>(`/users/${id}`);
    }

    public async login(username: string, password: string): Promise<UserType> {
        // will be used when api's are ready
        // try {
        //     const user = await apiService.post<UserType>('/login', { username, password });
        //     return user;
        // } catch (error) {
        //     console.error('Login error:', error);
        //     throw error;
        // }

        // Simulating with a delay and mock data. And network latency
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if username and password match the mock data
        if (username === 'admin' && password === 'admin') {
            return mockUser;
        } else {
            throw new Error('Invalid credentials');
        }
    }

    public async logout(): Promise<void> {
        // try {
        //     await apiService.post('/logout', {});
        // } catch (error) {
        //     console.error('Logout error:', error);
        //     throw error;
        // }

        // mock
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

}

// Export a singleton instance of the AuthService class
const authService = new AuthService();
export default authService;