<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


# 🧿 Microservice using Clean Architecture & NestJS

## Clone repository

```bash
$ git clone https://github.com/gitmariosalazar/microservices.git
```

## Project setup
### Gateway
```bash
$ cd microservices/backend/gateway
$ npm install
```

### Products microservice
```bash
$ cd microservices/backend/products-ms
$ npm install
```
### Authentication microservice
```bash
$ cd microservices/backend/authentication-ms
$ npm install
```
### Sales microservice
```bash
$ cd microservices/backend/sales-ms
$ npm install
```

### Returns microservice
```bash
$ cd microservices/backend/returns-ms
$ npm install
```

## Run prisma
- Run the following command:
```bash
$ cd microservices/backend/authentication-ms # Change the folder name for others microservices
$ npm run prisma:generate 
```

## Compile and run the microservices and gateway

```bash
$ cd microservices/backend/gateway  # Change the folder name for others
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```
- View Endpoints: [http://localhost:5000/api](http://localhost:3000/api)
## 🛢️ Configure Database
- Create database
```bash
mysql -u root -p
create database microservices
```
- Restore database
```bash
$ mysql -u root -p <database name> < "<Path>\microservices\backup\microservices.sql"
```

## 📂 Project Structure for the microservices

```aiignore
📂products-ms/
├──📂src/
│   ├──📂errors/               # Configuraciones para manejar errores
│   ├──📂modules/
│   │   ├──📂products/         # Módulo de productos
│   │   │   ├──📂application/
│   │   │   ├──📂domain/
│   │   │   └──📂infrastructure/
│   │   └──📂users/            # Agregar estructura similar al módulo de productos
│   │       ├──📂application/...
│   │       ├──📂domain/...
│   │       └──📂infrastructure/..
│   ├──📂settings/
│   │   ├──📜envs.ts
│   │   └──📜index.ts
│   ├──📂shared/
│   │    ├──📂database/
│   │    │   ├──📜mysql.service.ts
│   │    │   ├──📜postgres.service.ts
│   │    │   └──📜add-others.ts
│   │    ├──📂prisma/
│   │    │   ├──📂migrations/
│   │    │   ├──📜prisma.service.ts
│   │    │   └── ▲ schema.prisma
│   │    └──📂typeorm/
│   │        └──📜typeorm.database.ts
│   │───📜app.module.ts
│   │───📜main.ts
│   └───📂test/
└───.env

```

### 1. **Errors** (`/src/errors`)
This folder contains global error-handling utilities to manage application errors effectively.

---

### 2. **Modules** (`/src/modules`)
Modules represent the core business domains (e.g., `products`, `users`) and are structured into three layers:

#### a. **Application Layer**
Handles business logic, use cases, and mappers. It interacts with the domain layer and infrastructure.

- **Mappers:** Converts entities and models between layers (e.g., `product.mapper.ts`).
- **Service:** Implements use cases (`product-use-case.service.ts`).
- **Use Case:** Defines interfaces for services.

#### b. **Domain Layer**
Defines business rules and core concepts:

- **Contracts:** Interfaces to define repository behaviors.
- **DTOs:** Data Transfer Objects for request/response handling.
- **Models:** Business models encapsulating core logic.

#### c. **Infrastructure Layer**
Handles database operations, external services, and frameworks:

- **Adapters:** Bridges domain and infrastructure.
- **Controller:** Exposes endpoints to interact with application logic.
- **Entities:** Defines database schemas.
- **Repositories:** Implements persistence logic for databases (e.g., MySQL, PostgreSQL, Prisma).

---

### 3. **Settings** (`/src/settings`)
Contains environment configuration files and settings for different environments (`envs.ts`).

---

### 4. **Shared** (`/src/shared`)
Reusable utilities and services:

- **Database:** Provides database connection services (e.g., `mysql.service.ts`, `prisma.service.ts`).
- **Prisma/TypeORM:** Configurations for ORM tools.

---

### 5. **Application Root**
- **`app.module.ts`:** Entry point for module registration.
- **`main.ts`:** Bootstrap file for application initialization.

---

## 🔐 Environment Variables Configuration (`.env`)

This document explains the purpose of each environment variable used in the application. These variables ensure proper configuration and connection to external services and databases.

### General Variables For Microservices

- **`PORT`**: Specifies the port each microservice on which the application will run.

- **`SECRET_KEY`**: A secret key used for token generation and application security. (authentication microservice)

- **`PERCENTAGE_INCREMENT`**: Represents a percentage value for specific application logic. (products microservice)

- **`PROVIDER_DATABASE`**: Specifies the provider to prisma.

- **`DATABASE_URL`**: Connection string for Prisma, supporting PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, or CockroachDB. It is used by Prisma to interact with the database. Refer to the Prisma documentation for more details:

### General Variables For Gateway
```
PORT=5000

AUTH_MICROSERVICE_HOST=localhost
AUTH_MICROSERVICE_PORT=3001
AUTH_SERVICE=AUTH_SERVICE

PRODUCTS_MICROSERVICE_HOST=localhost
PRODUCTS_MICROSERVICE_PORT=3002
PRODUCTS_SERVICE=PRODUCTS_SERVICE

SALES_MICROSERVICE_HOST=localhost
SALES_MICROSERVICE_PORT=3003
SALES_SERVICE=SALES_SERVICE

RETURNS_MICROSERVICE_HOST=localhost
RETURNS_MICROSERVICE_PORT=3004
RETURNS_SERVICE=RETURNS_SERVICE

```

Description of Variables

- **`PORT`**: Port on which the client gateway will run.

- **`MICROSERVICE_HOST`**: Host (usually localhost during development) where each microservice is running.

- **`MICROSERVICE_PORT`**: Port assigned to each corresponding microservice.

- **`SERVICE`**: Identifier used by the gateway to route and communicate with each microservice.

These variables configure the client gateway to communicate with the Authentication, Products, Sales, and Returns microservices. Make sure the host and port match the actual running services.

## Database Variables

## Run tests  (Not implemented yet)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Stay in touch

- Author - [Mario Salazar](https://mssalazar.com)
- Website - [https://mssalazar.com](https://mssalazar.com)
- WhatsApp - [Send message](https://wa.link/pl94td)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

