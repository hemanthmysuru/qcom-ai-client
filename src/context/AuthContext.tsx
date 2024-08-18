import { createContext, useContext, useState } from "react";
import { UserType } from "../sdk/types/user.type";
import { useNavigate } from "react-router-dom";
import authService from "../sdk/services/authService";

interface IAuthContext {
    isAuthenticated: boolean;
    user: UserType | null;
    login: (email: string, password: string) => void;
    logout: () => void
}

const AuthContext: React.Context<IAuthContext> = createContext<IAuthContext>({
    isAuthenticated: false,
    user: null,
    login: () => { },
    logout: () => { }
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserType | null>(null);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            const user = await authService.login(email, password);
            console.log(user);
            setIsAuthenticated(true);
            setUser(user);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setIsAuthenticated(false);
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}