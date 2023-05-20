require("dotenv").config()
const nodemailer = require('nodemailer');

const sendMail_to = 'officialabhishek99@gmail.com'
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lolmat.asia67@gmail.com',
      pass: process.env.GMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: '"no-reply" <lolmat.asia67@gmail.com>',
    to: sendMail_to,
    subject: 'Alert!',
    text: 'Hello World!',
    html: '<i>Hello World!</i>'
  };

 const sendMail = transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: to ', sendMail_to, mailOptions.subject + info.response);
    }
  });
  
  module.exports = sendMail 

import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

interface Post {
  id: number;
  title: string;
  body: string;
}

const apiUrl = "https://jsonplaceholder.typicode.com/posts";

const CrudTable = () => {
  const [data, setData] = useState<Post[]>([]);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response: AxiosResponse<Post[]> = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response: AxiosResponse<Post> = await axios.post(apiUrl, {
        title,
        body
      });
      setData([...data, response.data]);
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const response: AxiosResponse<Post> = await axios.put(
        `${apiUrl}/${id}`,
        { title, body }
      );
      const updatedData = data.map((item) =>
        item.id === id ? response.data : item
      );
      setData(updatedData);
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      const filteredData = data.filter((item) => item.id !== id);
      setData(filteredData);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (id: number) => {
    const item = data.find((item) => item.id === id);
    if (item) {
      setTitle(item.title);
      setBody(item.body);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.body}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(item.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add
        </Button>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default CrudTable;
