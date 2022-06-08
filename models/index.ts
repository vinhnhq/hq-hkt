import { computed, makeObservable } from "mobx";

import AppStore from "../stores";
import { IUser, IPost, IComment } from "../types";

export class User implements IUser {
  id: number;
  name: string;
  username: string;
  email: string;

  constructor(private store: AppStore, user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;

    makeObservable(this, {
      posts: computed,
    });
  }

  get posts() {
    return this.store.post.all.filter((it) => it.userId === this.id);
  }
}

export class Post implements IPost {
  id: number;
  userId: number;
  title: string;
  body: string;

  constructor(private store: AppStore, post: IPost) {
    this.id = post.id;
    this.userId = post.userId;
    this.title = post.title;
    this.body = post.body;

    makeObservable(this, { user: computed, comments: computed });
  }

  get user() {
    return this.store.user.byId.get(this.userId);
  }

  get comments() {
    return this.store.comment.all.filter((it) => it.postId === this.id);
  }
}

export class Comment implements IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;

  constructor(private store: AppStore, comment: IComment) {
    this.id = comment.id;
    this.postId = comment.postId;
    this.name = comment.name;
    this.email = comment.email;
    this.body = comment.body;

    makeObservable(this, { post: computed });
  }

  get post() {
    return this.store.post.byId.get(this.postId);
  }
}
