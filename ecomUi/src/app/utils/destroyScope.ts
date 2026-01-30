import { DestroyRef, inject } from '@angular/core';
import { Subscription } from 'rxjs';

export function destroyScope() {
  const subscriptions = new Subscription();
  inject(DestroyRef).onDestroy(() => {
    subscriptions.unsubscribe();
  });
  return subscriptions;
}
