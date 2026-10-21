# astro-product-catalog-demo

A didactic demo built with **Astro**, **React**, and **TypeScript** to showcase how to consume a public web service using **DummyJSON**.

This project demonstrates:

- **SSR in Astro** for initial server-rendered content
- **React client-side fetching** for interactive search and filtering
- **TypeScript** for safer data handling and better developer experience
- A clean structure suitable for **technical interviews** and **CodeSandbox demos**

---

## Features

- Fetches products from the [DummyJSON API](https://dummyjson.com/)
- Renders an initial product list using Astro SSR
- Uses a React component for:
  - live search
  - category filtering
  - loading and error states
- Built with TypeScript
- Minimal setup, easy to run and explain

---

## Tech Stack

- [Astro](https://astro.build/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [DummyJSON](https://dummyjson.com/)

---

## Project Structure

```bash
src/
  components/
    ProductSearch.tsx
  pages/
    index.astro
    