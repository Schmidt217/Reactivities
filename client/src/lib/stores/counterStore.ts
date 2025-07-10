import { makeAutoObservable } from 'mobx';

class CounterStore {
  title = 'Counter Store';
  count = 0;
  events: string[] = [`Initial count is ${this.count}`];

  constructor() {
    makeAutoObservable(this);
  }

  increment = (amount = 1) => {
    this.count += amount;
    this.events.push(`Incremented by ${amount}, count is now ${this.count}`);
  };
  decrement = (amount = 1) => {
    this.count -= amount;
    this.events.push(`Decrememnted by ${amount}, count is now ${this.count}`);
  };

  get eventCount() {
    return this.events.length;
  }
}

export default CounterStore;
