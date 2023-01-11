import { gql } from 'apollo-server-express';

export const launchSchema = gql`
  type Launch {
    id: ID!
    name: String
    year: Int
  }

  extend type Query {
    launches: [Launch]
    launch(id: ID!): Launch
  }
`;


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
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Launches = () => {
    const [launches, setLaunches] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const query = `
                  query {
                    launches {
                      mission_name
                      launch_year
                      launch_success
                    }
                  }
                `;
                const { data } = await axios({
                    method: 'post',
                    url: 'https://api.spacex.land/graphql',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        query
                    }
                });
                setLaunches(data.data.launches);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
        <div>
            {launches.map((launch) => (
                <div key={launch.mission_name}>
                    <p>Mission Name: {launch.mission_name}</p>
                    <p>Launch Year: {launch.launch_year}</p>
                    <p>Launch Success: {launch.launch_success ? "Yes" : "No"}</p>
                </div>
            ))}
        </div>
    );
};



export default Launches;

import { Resolver, Query } from '@nestjs/graphql';
import { Launch } from './dummy-data';

@Resolver()
export class LaunchResolver {
  private launches: Launch[] = [
    { id: 1, name: 'Falcon 1', year: 2008 },
    { id: 2, name: 'Falcon 9', year: 2010 },
  ];

  @Query()
  launches() {
    return this.launches;
  }

  @Query()
  launch(id: number) {
    return this.launches.find(launch => launch.id === id);
  }
}

