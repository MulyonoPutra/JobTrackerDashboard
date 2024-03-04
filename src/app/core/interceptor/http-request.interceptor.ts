import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, tap } from "rxjs";

import { Injectable } from "@angular/core";
import { LoadingService } from "src/app/shared/services/loading.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private readonly loadingService: LoadingService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.show();

    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<unknown>) => {
          if (event instanceof HttpResponse) {
            this.loadingService.hide();
          }
        },
        () => {
          this.loadingService.hide();
        },
      ),
    );
  }
}
