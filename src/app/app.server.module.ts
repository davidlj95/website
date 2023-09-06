import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';

import { AppModule } from './app.module';
import { WINDOW } from './common/injection-tokens';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    // No window available on server. Shouldn't be used anyway
    {provide: WINDOW, useValue: {}}
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
}
