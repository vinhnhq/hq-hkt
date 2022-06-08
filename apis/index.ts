import axios from "axios";

import AppStore from "../stores";

export default class AppApi {
  client = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });

  user: UserApi;
  post: PostApi;
  comment: CommentApi;

  constructor(store: AppStore) {
    this.user = new UserApi(this, store);
    this.post = new PostApi(this, store);
    this.comment = new CommentApi(this, store);
  }
}

export class CommentApi {
  constructor(private api: AppApi, private store: AppStore) {}

  async getByPostId(postId: number) {
    const res = await this.api.client.get(`/posts/${postId}/comments`);
    this.store.comment.load(res.data);
  }
}

export class PostApi {
  constructor(private api: AppApi, private store: AppStore) {}

  async getAll() {
    const res = await this.api.client.get(`/posts`);
    this.store.post.load(res.data);
  }

  async getById(id: number) {
    const res = await this.api.client.get(`/posts/${id}`);
    this.store.post.load([res.data]);
  }

  async getByUserId(userId: number) {
    const res = await this.api.client.get(`/posts?userId=${userId}`);
    this.store.post.load(res.data);
  }
}

export class UserApi {
  constructor(private api: AppApi, private store: AppStore) {}

  async getAll() {
    const res = await this.api.client.get(`/users`);
    this.store.user.load(res.data);
  }

  async getById(id: number) {
    const res = await this.api.client.get(`/users/${id}`);
    this.store.user.load([res.data]);
  }
}
