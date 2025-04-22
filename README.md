# RestCountriesAPI

Express + SQLite API with JWT authentication, per‑user API keys, and admin management — and containerized with Docker.

Locally hosted

## Features

- **User Auth** via JWT
  - Register / Login / Profile endpoints
  - separate login window for admin
- **API Key Management** for each user
  - Generate, list, update, delete your own keys (users)
  - Per‑key usage logging (count, last used)
- **Countries Endpoints** (proxy to [REST Countries](https://restcountries.com))
  - `/countries` and `/countries/:name` protected by `x-api-key`
- **Admin Functions** (role `admin`) identified as 1
  - Manage **all** users (view, change role, delete)\
- **Error Handling** for bad requests and internal server error
- **Dockerized** using the `Dockerfile`

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Docker](#docker)
4. [API Reference](#api-reference)

---

## Prerequisites

- Node.js 18+
- npm (or yarn)
- (optional) Docker & Docker Compose

---

## Getting Started

1. **Clone the repo**

- ```bash
  git clone https://github.com/W1867037-6COSC022C/RestCountiresAPI.git
  cd RestCountiresAPI
  ```

````

2. **Install dependencies**
```bash
npm install
````

3. **Hosting Server with Auto Restart**
   ```bash
   nodemon app.js
   ```

## Docker

**A Dockerfile and .dockerignore are included for containerization.**

1. **Build the image**

   ```bash
   docker build -t rest-countries .

   ```

## Api Reference

1. **Import openapi.yaml into a Swagger UI instance or view it via:**
   ```bash
   http://localhost:3001/api-docs
   ```

-
