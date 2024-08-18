import envConfig from "../../EnvConfig";
import apiService from "../core/apiService";
import { UserType } from "../types/user.type";
import { validateEndpoint } from "../utils/utils";

const mockUser: UserType = {
    firstName: 'Peter',
    lastName: 'Bishop',
    emailId: 'admin@example.com',
    designation: 'Ops Manager'
};

class AuthService {

    private endPoints: { [key: string]: any };
    private endPointCategory: string;

    constructor() {
        this.endPoints = envConfig?.endPoints;
        this.endPointCategory = 'auth';
    }

    public async login(emailId: string, password: string): Promise<UserType> {
        try {
            const url = validateEndpoint(this.endPoints, this.endPointCategory, 'login');
            return await apiService.post<UserType>(url, { emailId, password });
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }

        // // Simulating with a delay and mock data. And network latency
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        // // Check if username and password match the mock data
        // if (emailId === 'admin' && password === 'admin') {
        //     return mockUser;
        // } else {
        //     throw new Error('Invalid credentials');
        // }
    }

    public async logout(): Promise<void> {
        // try {
        //     const url = validateEndpoint(this.endPoints, this.endPointCategory, 'logout');
        //     await apiService.post(url, {});
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