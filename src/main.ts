import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { enableProdMode, importProvidersFrom } from '@angular/core';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { AuthInterceptorProvider } from './app/core/providers/auth-interceptor.provider';
import { HttpRequestInterceptorProvider } from './app/core/providers/http-request-interceptor.provider';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from './environments/environment';

if (environment.production) {
	enableProdMode();
	if (window) {
		selfXSSWarning();
	}
}

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(
			BrowserModule,
			AppRoutingModule,
			TranslateModule.forRoot({
				loader: {
					provide: TranslateLoader,
					useFactory: HttpLoaderFactory,
					deps: [HttpClient],
				},
			})
		),
		AuthInterceptorProvider,
		HttpRequestInterceptorProvider,
		HttpClientModule,
		provideHttpClient(),
	],
}).catch((err) => console.error(err));

function selfXSSWarning() {
	setTimeout(() => {
		console.log(
			'%c** STOP **',
			'font-weight:bold; font: 2.5em Arial; color: white; background-color: #e11d48; padding-left: 15px; padding-right: 15px; border-radius: 25px; padding-top: 5px; padding-bottom: 5px;'
		);
		console.log(
			`\n%cThis is a browser feature intended for developers. Using this console may allow attackers to impersonate you and steal your information sing an attack called Self-XSS. Do not enter or paste code that you do not understand.`,
			'font-weight:bold; font: 2em Arial; color: #e11d48;'
		);
	});
}

export function HttpLoaderFactory(httpClient: HttpClient) {
	return new TranslateHttpLoader(httpClient);
}
