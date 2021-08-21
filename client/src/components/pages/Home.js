import React from "react";
import { useQuery } from "@apollo/client";
import { POST_FETCH_QUERY } from "../../query/post";
import { Grid } from "semantic-ui-react";
import PostCard from "../PostCard";
import CustomTransition from "../utils/CustomTransition";
import CreatePost from "../CreatePost";
// import _ from "lodash";

function Home() {
  const { loading, error, data } = useQuery(POST_FETCH_QUERY);
  // const context = useContext(authContext);

  return (
    <CustomTransition>
      <Grid columns="three" style={{ marginTop: 5 }}>
        <Grid.Row>
          <Grid.Column className="recent">
            <h1>Recent Posts</h1>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="recent recent--middle">
          <Grid.Column width={5}>
            <CreatePost />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1>loading . . </h1>
          ) : error ? (
            <h1>`Error: ${error.message}`</h1>
          ) : (
            data &&
            data.getPosts.map((post) => {
              return (
                <Grid.Column key={post.id}>
                  <PostCard {...post} />
                </Grid.Column>
              );
            })
          )}
        </Grid.Row>
      </Grid>
    </CustomTransition>
  );
}

export default Home;
