import { Pagination } from "./pagination";

export interface HttpResponseEntity<T> {
  message: string;
  data: T;
  pagination?: Pagination
}

