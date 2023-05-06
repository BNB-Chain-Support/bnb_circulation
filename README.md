# Getting Started with BNB Circulation React App

Webpage/Tool for details regarding BNB circulation

## Pre-requisites:

    -   NodeJS (>16)
    -   NPM (Node package manager)
    -   IDE (Eg: VS Code)
    -   GIT

## Setup Steps

1. Clone the repo:

   ```
   $ git clone https://github.com/BNB-Chain-Support/bnb_circulation.git
   ```

1. Go to `bnb_circulation` directory

   ```
   $ cd bnb_circulation
   ```

1. Install all dependencies

   ```
   $ npm install
   ```

1. Copy `.env.example` to `.env` and setup variables as per BNB Burn Proxy server details

   ```
   $ cp .env.example .env
   ```

1. Set the following properties in `.env` file with BNB Burn Proxy Server's host and port.

   Eg:

   ```
        REACT_APP_BNB_BURN_PROXY_SERVER_HOST = 0.0.0.0
        REACT_APP_BNB_BURN_PROXY_SERVER_PORT = 4000
   ```

1. Run this BNB Circulation React App:

   ```
   $ npm start
   ```
