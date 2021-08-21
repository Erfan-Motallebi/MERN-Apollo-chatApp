import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { SINGLE_POST_FETCH_QUERY } from "../query/post";
import { Card, Grid, Image, Button } from "semantic-ui-react";
import { imageUrl } from "./PostCard";
import dayjs from "dayjs";
import LikeButton from "./LikeButton";
import { authContext } from "./utils/context/context";
import DeletePost from "./DeletePost";

function SinglePost(props) {
  const { data } = useQuery(SINGLE_POST_FETCH_QUERY, {
    variables: {
      postId: props.match.params.id,
    },
  });

  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  console.info(data);

  const { user } = useContext(authContext);
  let postMarkHTML;
  if (!getPost) {
    postMarkHTML = <p>loading . . . . </p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      likes,
      likeCount,
      commentCount,
      comments: { id: commentId, username: commentUser, body: commentBody },
    } = getPost;

    postMarkHTML = (
      <Grid>
        <Grid.Column width={2}>
          <Image src={imageUrl} bordered size="medium" floated="right" />
        </Grid.Column>
        <Grid.Column width={12}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>
                <span>Last seen {dayjs(createdAt).fromNow()}</span>
              </Card.Meta>
              <Card.Description>{commentBody}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <LikeButton user={user} post={{ id, likes, likeCount }} />
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
              />
              {user && user.username === username && <DeletePost postId={id} />}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    );
  }

  return postMarkHTML;
}

export default SinglePost;
