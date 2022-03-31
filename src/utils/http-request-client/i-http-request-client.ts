export default interface HttpRequestClientType {
  get<T>(url: string, options?: Record<string, unknown>): Promise<T>;
  post<T>(
    url: string,
    body: Record<string, unknown>,
    options?: Record<string, unknown>
  ): Promise<T>;
  setHttpClientConfig(props: {
    baseUrl: string;
    timeout: number;
    headers: Record<string, string>;
  }): void;
}
