import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Image, Button } from "semantic-ui-react";
import dayjs from "dayjs";
import { authContext } from "./utils/context/context";
import LikeButton from "./LikeButton";
import DeletePost from "./DeletePost";

export const imageUrl =
  "https://react.semantic-ui.com/images/avatar/large/matthew.png";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function PostCard({
  id,
  username,
  createdAt,
  commentCount,
  likeCount,
  body,
  likes,
}) {
  const { user } = useContext(authContext);
  return (
    <Card fluid className="card" color="violet">
      <Card.Content>
        <Image floated="right" size="mini" src={imageUrl} />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{dayjs(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likeCount, likes }} />
        <Button
          color="red"
          basic
          content="comment"
          icon="comments"
          label={{
            basic: false,
            color: "purple",
            pointing: "left",
            content: commentCount,
          }}
          as={Link}
          to={`/posts/${id}`}
        />
        {user && user.username === username && <DeletePost postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
