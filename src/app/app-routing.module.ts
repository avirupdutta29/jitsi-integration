import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JitsiComponent } from './MyComponent/jitsi.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
    {
        path: '',
        component: JitsiComponent
    },
    {
        path: 'thank-you',
        component: ThankYouComponent
    },
    {
        path: 'jitsi-component',
        component: JitsiComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
