import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {

    private static instance: ApiService;
    private apiClient: AxiosInstance;

    constructor() {
        // Get the base URL from environment variables
        const baseURL = process.env.REACT_APP_API_BASE_URL;

        this.apiClient = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Set up interceptors
        this.initializeRequestInterceptor();
        this.initializeResponseInterceptor();
    }

    // Static method to get the single instance of the class
    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    // Method to initialize request interceptors
    private initializeRequestInterceptor() {
        this.apiClient.interceptors.request.use(
            // (config: AxiosRequestConfig) => {
            (config) => {
                // Modify config if necessary, e.g., adding authorization headers
                // config.headers.Authorization = `Bearer ${yourAuthToken}`;
                return config;
            },
            (error) => {
                // Handle request error
                return Promise.reject(error);
            }
        );
    }

    // Method to initialize response interceptors
    private initializeResponseInterceptor() {
        this.apiClient.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => {
                // Handle response errors
                return Promise.reject(error);
            }
        );
    }

    // Generic GET request
    public async get<T>(url: string, params?: any): Promise<T> {
        const response = await this.apiClient.get<T>(url, { params });
        return response.data;
    }

    // Generic POST request
    public async post<T>(url: string, data: any): Promise<T> {
        const response = await this.apiClient.post<T>(url, data);
        return response.data;
    }

    // Generic PUT request
    public async put<T>(url: string, data: any): Promise<T> {
        const response = await this.apiClient.put<T>(url, data);
        return response.data;
    }

    // Generic DELETE request
    public async delete<T>(url: string): Promise<T> {
        const response = await this.apiClient.delete<T>(url);
        return response.data;
    }
}

// Export the singleton instance of the ApiService class
export default ApiService.getInstance();

// // Export a singleton instance of the ApiService class
// const apiService = new ApiService();
// export default apiService;
