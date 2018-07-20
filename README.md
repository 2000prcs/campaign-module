# Quickstarter: Campaign Module

> This module is for a crowdfunding web application which allows users to make pledges for prototype products. Users can view each product's pledge levels and back a product 


## Table of Contents

1. [Installation](#installation)
2. [Tests](#running-the-tests)


## Demo

### 👉 Watch [Demo Video](https://vimeo.com/267902202)
<br>

<img src="https://media.giphy.com/media/9x1gTrNEeF2PQoAs3d/giphy.gif">

## Stress Testing Result

> Conducted stress testing with 309M data with 10M primary data to create a realistic scenario

> Testing tool: Artillery, New Relic


1. [Module Stress Testing Result](https://gist.github.com/2000prcs/cbda8b64c7b37085a3b2a68a4ae19c5f)

New Relic Result

<img src="https://i.imgur.com/Z5JcGVi.png">
 
2. [Proxy Stress Testing Result](https://gist.github.com/2000prcs/335d2e4665aac3c99445bfd6231c0e8e)
3. [Stress Testing in Deployment Result](https://gist.github.com/2000prcs/0a57b31ab296e450bbc380b1f640cfd2)


## Getting Started

Application Url: http://localhost:7777/?:productId
<br>
productId range is 0 to 10000000 (inclusive) 

## Prerequisites

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Installation

From within the root directory:

1. Install project dependencies:

```sh
npm install
```

2. Build a client bundle with webpack: 

```sh
npm run react-dev (for development) 
npm run react-prod (for production)
```

3. Start the app:

```sh
npm start
```

## Running the Tests

```sh
npm test
```

## Built With

* [React](https://reactjs.org/) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management
* [PostgreSql](https://www.postgresql.org/docs/) - SQL Database


## Style Guide

Refer to the [AirBnb Style Guide](https://github.com/airbnb/javascript).
