import Link from "next/Link";

import { observer } from "mobx-react";
import React from "react";

import { Post as IPost } from "../models";

const Post: React.FC<{ post: IPost; ellipsisBody?: boolean }> = observer(
  ({ post, ellipsisBody = true }) => {
    return (
      <div>
        <h2>{post.title}</h2>
        <p>
          {ellipsisBody ? post.body.substr(0, 50) : post.body}
          {ellipsisBody && (
            <span>
              <span className="ellipsis">...</span>
              <Link href={`/post/${post.id}`}>
                <a className="button">read more</a>
              </Link>
            </span>
          )}
        </p>
        <p>
          Written by{" "}
          <Link href={`/user/${post.userId}`}>
            <a className="button author">{post.user?.name}</a>
          </Link>
        </p>

        <style jsx>{`
          .ellipsis {
            margin: 0 4px;
          }

          .button {
            color: #2e2e2e;
            border: 1px solid #2e2e2e;
            text-decoration: none;
            text-transform: uppercase;
          }

          .author {
            border: none;
            text-decoration: underline;
          }
        `}</style>
      </div>
    );
  }
);

export default Post;
