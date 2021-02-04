import { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ResponseResult<T> {
  code: number;
  message: string;
  data?: T;
}

declare module 'axios' {
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>;
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
  }
}

// export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> { }

// export interface Axios {
//     request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;

//     get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

//     delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

//     head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

//     options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

//     post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

//     put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

//     patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
// }
// export interface AxiosInstance extends Axios {
//     <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
//     <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
// }
