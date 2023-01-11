const { ApolloServer} = require("apollo-server");

const { typeDefs } = require( "./schema/type-defs");
const { resolvers } = require( "./schema/resolvers");
const server = new ApolloServer({ typeDefs, resolvers });

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ id }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const query = `
          query GetUser($id: ID!) {
            user(id: $id) {
              name
              email
            }
          }
        `;
        const { data } = await axios.post('/graphql', {
          query,
          variables: { id },
        });
        setUser(data.data.user);
      } catch (err) {
        setError(err);
      }
  
      setLoading(false);
    };
  
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;

server.listen().then(({url}) => {
    console.log("YOUR API IS RUNNING :",url)
    });
