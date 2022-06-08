import { action, computed, makeObservable, observable } from "mobx";

import AppStore from ".";

import { IPost } from "../types";
import { Post } from "../models";

export default class PostStore {
  byId = new Map<number, Post>();

  constructor(private store: AppStore) {
    makeObservable(this, {
      byId: observable,
      load: action,
      all: computed,
    });
  }

  load(posts: IPost[]) {
    posts.forEach((post) => this.byId.set(post.id, new Post(this.store, post)));
  }

  get all() {
    return Array.from(this.byId.values());
  }
}
