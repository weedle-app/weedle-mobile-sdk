import type HttpRequestClientType from './i-http-request-client';
import HttpRequestClient from './http-request-client';

// Factory method that returns http request client
export const getHttpClient = (): HttpRequestClientType =>
  HttpRequestClient.Instance;
