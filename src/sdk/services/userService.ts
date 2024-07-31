import apiService from "../core/apiService";
import { UserType } from "../types/user.type";

class UserService {
    // Method to get all users
    public async getUsers(): Promise<UserType[]> {
        return await apiService.get<UserType[]>('/users');
    }

    // Method to get a single user by ID
    public async getUserById(id: number): Promise<UserType> {
        return await apiService.get<UserType>(`/users/${id}`);
    }

    // Method to create a new user
    public async createUser(user: Omit<UserType, 'id'>): Promise<UserType> {
        return await apiService.post<UserType>('/users', user);
    }

    // Method to update an existing user
    public async updateUser(id: number, user: Partial<UserType>): Promise<UserType> {
        return await apiService.put<UserType>(`/users/${id}`, user);
    }

    // Method to delete a user
    public async deleteUser(id: number): Promise<void> {
        await apiService.delete<void>(`/users/${id}`);
    }
}

// Export a singleton instance of the UserService class
const userService = new UserService();
export default userService;