import { makeObservable, observable, action, computed } from "mobx";

import AppStore from ".";

import { IUser } from "../types";
import { User } from "../models";

export default class UserStore {
  byId = new Map<number, User>();

  constructor(private store: AppStore) {
    makeObservable(this, {
      byId: observable,
      load: action,
      all: computed,
    });
  }

  load(users: IUser[]) {
    users.forEach((user) => this.byId.set(user.id, new User(this.store, user)));
  }

  get all() {
    return Array.from(this.byId.values());
  }
}
