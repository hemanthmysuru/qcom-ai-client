import { createContext, useContext, useState } from "react";
import { UserType } from "../sdk/types/user.type";

// Define the shape of your authentication context
interface IAuthContext {
    isAuthenticated: boolean;
    user: UserType | null;
    login: (username: string, password: string) => void;
    logout: () => void
}

// Create a new context with initial values
const AuthContext: React.Context<IAuthContext> = createContext<IAuthContext>({
    isAuthenticated: false,
    user: null,
    login: () => { },
    logout: () => { }
});

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your app with
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserType | null>(null); // Replace with actual user data type

    // Function to handle login
    const login = (username: string, password: string) => {
        console.log('username::', username);
        // Replace with actual authentication logic (e.g., API call)
        if (username === 'admin' && password === 'admin') {
            setIsAuthenticated(true);
            setUser({
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@example.com',
                phoneNumber: '123-456-7890',
                username: 'admin',
            })
        } else {
            setIsAuthenticated(false);
            setUser(null);
            alert('Invalid credentials');
        }
    }

    const logout = () => {
        // Replace with actual logout logic (e.g., clear tokens)
        setIsAuthenticated(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}