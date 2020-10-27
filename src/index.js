import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import ApolloClient from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';

// const httpLink = createUploadLink({
//   uri: 'http://localhost:4001/crm',
// });

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

ReactDOM.render(
  <Router>
     {/* <ApolloProvider client={client}> */}
    <App />
    {/* </ApolloProvider> */}
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
