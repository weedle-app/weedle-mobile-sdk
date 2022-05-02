export type APICallResponseType<T> = { data: T; status: number };

export default interface HttpRequestClientType {
  get<T>(
    url: string,
    options?: Record<string, unknown>
  ): Promise<APICallResponseType<T>>;
  post<T>(
    url: string,
    body: Record<string, unknown>,
    options?: Record<string, unknown>
  ): Promise<T>;
  setHttpClientConfig(props: {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
  }): void;
  checkConfig(): void;
}
