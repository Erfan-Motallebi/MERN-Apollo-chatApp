import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Icon, Modal, Header } from "semantic-ui-react";
import { POST_DELETE_QUERY } from "../query/post";

function DeletePost({ postId }) {
  const [open, setOpen] = useState(false);
  const [deletePostQuery, { error }] = useMutation(POST_DELETE_QUERY, {
    variables: {
      postId,
    },
  });

  const yesButton = () => {
    deletePostQuery();
    setOpen(false);
  };

  return (
    <>
      <Modal
        closeIcon
        open={open}
        trigger={
          <Button style={{ backgroundColor: "red" }} floated="right">
            <Icon name="trash" style={{ margin: 0, color: "white" }} />
          </Button>
        }
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header icon="trash">
          <h1>Post deletion</h1>
        </Header>
        <Modal.Content>
          <h2>Are you sure to delete your post?</h2>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpen(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" onClick={yesButton}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
export default DeletePost;
