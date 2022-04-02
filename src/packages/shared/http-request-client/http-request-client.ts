import axios from 'axios';
import type { APICallResponseType } from './i-http-request-client';
import type HttpRequestClientType from './i-http-request-client';

class HttpRequestClient implements HttpRequestClientType {
  private static _instance: HttpRequestClient;
  private axiosInstance = axios.create();
  private axiosSettings: any;

  private constructor() {}

  static get Instance() {
    return this._instance || (this._instance = new this());
  }

  setHttpClientConfig(props: {
    baseURL: string;
    timeout: number;
    headers: Record<string, string>;
  }): void {
    this.axiosSettings = props;
    this.axiosInstance = axios.create(props);
  }

  checkConfig(): any {
    console.log({
      xagetUsersNFTs: this.axiosInstance.defaults.baseURL,
      bb: this.axiosSettings,
    });
    return this.axiosInstance.defaults.baseURL;
  }

  async get<T>(
    url: string,
    options: Record<string, unknown> = {}
  ): Promise<APICallResponseType<T>> {
    const response = await this.axiosInstance.get(url, options);
    return { data: response.data, status: response.status };
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
