# Microservices with Typescript, RabbitMq and Docker

This project is built with typescript, node js, express and consists of three microservices: User Service, Booking Service, and Analytics Service. These services are managed and proxied via Nginx, and utilize RabbitMQ for pubsub messaging, and PostgreSQL for the database.

## Table of Contents

- [Architecture](#architecture)
- [Setup](#setup)
- [Running the Services](#running-the-services)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Nginx Configuration](#nginx-configuration)
- [Rate Limiting, Load Balancing, and Caching](#rate-limiting-load-balancing-and-caching)
- [Redis Cluster Setup](#redis-cluster-setup)
- [Database Replication](#database-replication)

## Architecture

- **User Service:** Manages user-related operations.
- **Booking Service:** Handles booking-related operations.
- **Analytics Service:** Provides analytics data.
- **Nginx:** Acts as a reverse proxy, load balancer and rate limiter.
- **RabbitMQ:** Message broker for communication between services.
- **PostgreSQL:** 

## Setup

1. **Clone the repository:**
```
  git clone https://github.com/MarloneA/irembo_assessment.git
```

2. **Install Docker:**
Make sure you have docker installed on your machine, Follow the instructions on the official Docker website to install Docker if not installed yet.

**Environment Variables:**
Create a .env file in the root directory of each file and add the following variables:

```
  PORT="8082"
  DATABASE_URL="postgresql://[user]:[password]@[host]:5432/[db_name]?schema=public"
  SESSION_NAME="booking-app"
  SESSION_SECRET_KEY="mysecretchangeinproduction"
  RABBITMQ_URL="amqps://[user]:[password]/[host]:[port]"
```

Build and run the Docker containers:
```bash
  docker-compose up --build
```


## Testing
You can test the microservices by sending requests to the respective endpoints via the api gateway:

*running locally with gateway:*
localhost is mapped to the respective ports so no need to specify the gateway port

- *User Service:* http://localhost/api/auth
- *Booking Service:* http://localhost/api/bookings
- *Analytics Service:* http://localhost/api/dashboard

*running locally on individual servers*[by-pass proxy]

- *User Service:* http://localhost:8081/api/auth
- *Booking Service:* http://localhost:8082/api/bookings
- *Analytics Service:* http://localhost:8083/api/dashboard

the service is also deployed on AWS on ipv4 server http://13.51.195.139:8080 to test the deployed service use these links

- *User Service:* http://13.51.195.139:8080/api/auth
- *Booking Service:* http://13.51.195.139:8080/api/bookings
- *Analytics Service:* http://13.51.195.139:8080/api/dashboard

the server on aws also provides access to the individual services by passing the proxy and specifying the port the service is running on.

## API Endpoints
### User Service:

POST /api/auth/register: Register a new user.
POST /api/auth/login: Login registered user.

### Booking Service:

- POST */api/bookings/create*: Create a new booking.
- POST */api/bookings/confirm*: Confirm a booking, only available to drivers.
- POST */api/bookings/cancel*: Cancel a booking.
- POST */api/bookings/override*: override a previously created booking.

### Analytics Service:

- GET */api/dashboard/analytics*: Get all analytics data.
- GET */api/dashboard/analytics?event="booking_created"*: Get analytics data for created bookings.
- GET */api/dashboard/analytics?event="booking_confirmed"*: Get analytics data for confirmed bookings.
- GET */api/dashboard/analytics?event="booking_cancelled"*: Get analytics data for cancelled bookings.
- GET */api/dashboard/analytics?event="booking_overriden"*: Get analytics data for bookings that were cancelled before 30min.

## Nginx Configuration
The Nginx configuration is located in the nginx.conf file. It is set up to proxy requests to the appropriate microservice based on the request path.

## Caveat
Check if nginx is already running locally, this might conflict with the version on docker. if you are running nginx on homebrew it should be fine, but if you are running it on a docker server make sure to turn it off first then rebuild the image

## Rate Limiting, Load Balancing, and Caching
Nginx is configured to handle rate limiting, load balancing, and caching.

Rate Limiting: Configured using the limit_req_zone and limit_req directives in the nginx.conf file.
Load Balancing: Nginx uses upstream blocks to define the servers for each service and load balances requests across them.
Caching: Configured using the proxy_cache and related directives in the nginx.conf file.