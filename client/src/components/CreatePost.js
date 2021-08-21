import { useMutation } from "@apollo/client";
import React, { Fragment, useState } from "react";
import { Form, Message, Input, Button } from "semantic-ui-react";
import { CREATE_POST_MUTATION, POST_FETCH_QUERY } from "../query/post";
import { useForm } from "./utils/useForm";

const CreatePost = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const { values, onSubmitHandler, onChangeHandler } = useForm(
    {
      body: "",
    },
    createPostCb
  );

  const [createPostQuery, { error }] = useMutation(CREATE_POST_MUTATION, {
    update(cache, result) {
      const { getPosts } = cache.readQuery({
        query: POST_FETCH_QUERY,
      });
      const updatedgetPosts = [...getPosts, result.data.createPost];
      cache.writeQuery({
        query: POST_FETCH_QUERY,
        data: {
          getPosts: updatedgetPosts,
        },
      });
      values.body = "";
    },
    onError: (err) => {
      console.log(err);
      setErrorMsg(err.graphQLErrors[0].message);
    },
    variables: values,
  });

  function createPostCb() {
    createPostQuery();
  }

  return (
    <Fragment>
      <Form onSubmit={onSubmitHandler}>
        <Input
          icon="send"
          iconPosition="left"
          placeholder="Your New Post"
          onChange={onChangeHandler}
          name="body"
          value={values.body}
          error={error ? true : false}
        />
        <Button content="Post" type="submit" icon="box" />
      </Form>
      {error && (
        <Message negative floating={true} error>
          <Message.Header>We're sorry. we can't apply the post.</Message.Header>
          <p>{errorMsg}</p>
        </Message>
      )}
    </Fragment>
  );
};

export default CreatePost;
