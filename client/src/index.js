import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloClient,
} from "@apollo/client";
import {setContext} from "@apollo/client/link/context" 

const url = new createHttpLink({
  uri: "http://localhost:5432/",
});

const authLink  = setContext((_, {headers}) => {
  const token = localStorage.getItem('JwtToken');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  }
})


const client = new ApolloClient({
  link: authLink.concat(url),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
