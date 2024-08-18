import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import envConfig from '../../EnvConfig';
import { generateUUID } from '../utils/utils';
import { useLoading } from '../../context/LoadingContext';
import EventBus from '../utils/eventEmitter';

class ApiService {

    private static instance: ApiService;
    private apiClient: AxiosInstance;
    private loading: any;

    constructor() {
        // Get the base URL from environment variables
        const baseURL = envConfig.apiUrl;
        console.log(baseURL, envConfig.env);

        this.apiClient = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // this.loading = useLoading();

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
                // this.loading.showLoading();
                const transactionId = config.headers['X-Transaction-ID'] || generateUUID();

                // Set the X-Transaction-ID header if it hasn't been explicitly set or removed
                if (transactionId) {
                    config.headers['X-Transaction-ID'] = transactionId;
                }
                EventBus.emit('loading', true);
                return config;
            },
            (error) => {
                // this.loading.hideLoading();
                EventBus.emit('loading', false);
                // Handle request error
                return Promise.reject(error);
            }
        );
    }

    // Method to initialize response interceptors
    private initializeResponseInterceptor() {
        this.apiClient.interceptors.response.use(
            (response: AxiosResponse) => {
                // this.loading.hideLoading();
                EventBus.emit('loading', false);
                return response;
            },
            (error) => {
                // this.loading.hideLoading();
                EventBus.emit('loading', false);
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

    public async patch<T>(url: string, data: any): Promise<T> {
        const response = await this.apiClient.patch<T>(url, data);
        return response.data;
    }
}

// Export the singleton instance of the ApiService class
export default ApiService.getInstance();

// // Export a singleton instance of the ApiService class
// const apiService = new ApiService();
// export default apiService;
