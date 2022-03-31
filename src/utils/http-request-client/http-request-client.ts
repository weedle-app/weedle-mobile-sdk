import axios from 'axios';
import type HttpRequestClientType from './i-http-request-client';

class HttpRequestClient implements HttpRequestClientType {
  private static _instance: HttpRequestClient;
  private axiosInstance = axios.create();

  private constructor() {}

  static get Instance() {
    return this._instance || (this._instance = new this());
  }

  setHttpClientConfig(props: {
    baseUrl: string;
    timeout: number;
    headers: Record<string, string>;
  }): void {
    this.axiosInstance = axios.create(props);
  }

  checkConfig(): void {
    console.log({ xagetUsersNFTs: this.axiosInstance.defaults });
  }

  get<T>(url: string, options: Record<string, unknown> = {}): Promise<T> {
    return this.axiosInstance.get(url, options);
  }

  post<T>(
    url: string,
    body: Record<string, unknown> = {},
    options: Record<string, unknown> = {}
  ): Promise<T> {
    return this.axiosInstance.post(url, body, options);
  }
}

export default HttpRequestClient;