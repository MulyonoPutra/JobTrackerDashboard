import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from '../interceptor/http-request.interceptor';

export const HttpRequestInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: HttpRequestInterceptor,
	multi: true,
};
