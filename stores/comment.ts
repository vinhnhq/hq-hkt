import { makeObservable, observable, action, computed } from "mobx";

import AppStore from ".";

import { IComment } from "../types";
import { Comment } from "../models";

export default class CommentStore {
  byId = new Map<number, Comment>();

  constructor(private store: AppStore) {
    makeObservable(this, {
      byId: observable,
      load: action,
      all: computed,
    });
  }

  load(users: IComment[]) {
    users.forEach((user) =>
      this.byId.set(user.id, new Comment(this.store, user))
    );
  }

  get all() {
    return Array.from(this.byId.values());
  }
}
