import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import { cartState } from './cart.state';
import { CartItem } from '../Models/CartItem.models';
import Swal from 'sweetalert2';

export const cartStore = signalStore(
  { providedIn: 'root' },

  withState<cartState>({
    cartItems: [],
    totalPrice: 0,
  }),

  withComputed((store) => ({
    items: computed(() => store.cartItems()),
    itemsCount: computed(() =>
      store.cartItems().reduce((sum, item) => sum + item.quantity, 0),
    ),

    isEmpty: computed(() => store.cartItems().length === 0),
  })),

  withMethods((store) => ({
    addToCart(game: CartItem['game'], quantity: number = 1) {
      const items = store.cartItems();
      const existingItem = items.find((i) => i.game.id === game.id);
      if (
        game.stock <
        (existingItem ? existingItem.quantity + quantity : quantity)
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Insufficient Stock',
          text: 'The requested quantity exceeds available stock.',
        });
      } else {
        const updatedItems = existingItem
          ? items.map((i) =>
              i.game.id === game.id
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            )
          : [
              ...items,
              {
                game,
                quantity,
                price: game.price,
              },
            ];

        patchState(store, {
          cartItems: updatedItems,
          totalPrice: calculateTotal(updatedItems),
        });
      }
    },

    removeFromCart(gameId: number) {
      const updatedItems = store
        .cartItems()
        .filter((i) => i.game.id !== gameId);

      patchState(store, {
        cartItems: updatedItems,
        totalPrice: calculateTotal(updatedItems),
      });
    },

    updateQuantity(gameId: number, quantity: number) {
      if (quantity <= 0) this.removeFromCart(gameId);
      if (
        quantity >
        store.cartItems().find((i) => i.game.id === gameId)?.game.stock!
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Insufficient Stock',
          text: 'The requested quantity exceeds available stock.',
        });
      } else {
        const updatedItems = store
          .cartItems()
          .map((i) => (i.game.id === gameId ? { ...i, quantity } : i));

        patchState(store, {
          cartItems: updatedItems,
          totalPrice: calculateTotal(updatedItems),
        });
      }
    },

    clearCart() {
      patchState(store, {
        cartItems: [],
        totalPrice: 0,
      });
    },
  })),
);

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
