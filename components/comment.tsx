import { observer } from "mobx-react";

import { Comment as IComment } from "../models";

const Comment: React.FC<{ comment: IComment }> = observer(({ comment }) => {
  return (
    <div>
      <strong>
        {comment.name} • {comment.email}
      </strong>
      <p>{comment.body}</p>
      <br />
    </div>
  );
});

export default Comment;
