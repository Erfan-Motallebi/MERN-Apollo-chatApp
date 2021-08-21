import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { POST_LIKE_MUTATION } from "../query/post";
import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);
  const [likeMutation] = useMutation(POST_LIKE_MUTATION, {
    variables: {
      postId: id,
    },
  });

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const LikeButton = user ? (
    liked ? (
      <Button content="like" basic={false} color="purple">
        <Icon name="heart" color="yellow" />
      </Button>
    ) : (
      <Button>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button basic as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );

  return (
    <>
      <Button as="div" labelPosition="right" onClick={likeMutation}>
        {LikeButton}
        <Label as="a" basic color="blue" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </>
  );
}
