import React from 'react';
import { render, screen } from '@testing-library/react';
import fetch from "node-fetch";
import App from './App';
import {server} from "./mocks/server";
import {createHandlers} from "./mocks/handlers";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('fetch fails', async () => {
  // tell current mock API server to use these handlers ONLY within current test
  server.use(...createHandlers({ shouldFail: true }));

  let response = await fetch('http://localhost/login');

  response = await response.json();

  expect(response.data).toBe("fail");
});

test('fetches successfully', async () => {
  let response = await fetch('http://localhost/login');

  response = await response.json();

  expect(response.data).toBe("success");
  expect(response.user).toMatchObject({
    id: 1,
    name: "user"
  });
});
