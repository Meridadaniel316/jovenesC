import { Injectable } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { AppState } from 'src/app/core/state/app.state';
import { TabModel } from '../../../core/models/tab.model';
import { TabsService } from '../../../core/services/tabs.service';

@Injectable({
  providedIn: 'root',
})
export class AdminContentContainerFacade {
  private subscriptions: Subscription;

  constructor(
    private state: AppState,
    private tabsService: TabsService,
  ) { }

  //#region Observables
  tabs$(): Observable<TabModel[]> {
    return this.state.tabs.tabs.$();
  }
  //#endregion

  //#region Public methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  loadTabs(): void {
    this.subscriptions.add(
      this.tabsService.getTabs().pipe(
        tap(this.storeTabs.bind(this)),
      ).subscribe(),
    );
  }

  destroyTabs(): void {
    this.state.tabs.tabs.set(null);
  }
  //#endregion

  //#region Private Methods
  private storeTabs(tabs: TabModel[]): void {
    this.state.tabs.tabs.set(tabs);
  } 
  //#endregion
}
