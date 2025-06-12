````markdown
# Flight-Booking

A full-stack web application for searching, selecting, and booking flights.  
Built with a Spring Boot + MySQL backend and a Next.js + TypeScript frontend, it integrates with the RapidAPI Flights API to fetch real-time flight data.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Configuration](#configuration)  
4. [Running the App](#running-the-app)  
   - [Backend](#backend)  
   - [Frontend](#frontend)  
5. [Project Structure](#project-structure)  
6. [API Reference](#api-reference)  
7. [Contributing](#contributing)  
8. [License](#license)  
9. [Contact](#contact)  

---

## Features

- **Search flights** by origin, destination, and date  
- **Browse available seats**, view fare classes  
- **Book tickets** and save reservations in your account  
- **User authentication** (sign up / sign in)  
- **Responsive UI** built with Tailwind CSS + shadcn/ui  
- **Real-time data** consumption via RapidAPI’s Flights API  
- **MySQL** persistence for user data and bookings

---

## Tech Stack

- **Backend**:  
  - Java + Spring Boot  
  - Spring Data JPA (MySQL)  
  - Maven  
- **Frontend**:  
  - Next.js (React) + TypeScript  
  - Tailwind CSS + shadcn/ui  
  - SWR (data fetching)  
- **External APIs**:  
  - RapidAPI Flights API  
- **Database**: MySQL  

---

## Getting Started

### Prerequisites

- **Java 17+**  
- **Maven 3.6+**  
- **Node.js 16+** & **npm** or **yarn**  
- **MySQL** server (or Docker container)

### Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/nityasundar2743/Flight-Booking.git
   cd Flight-Booking
````

2. **Backend setup** (Spring Boot)

   ```bash
   cd BackEnd/FlightBooking
   mvn clean install
   ```

3. **Frontend setup** (Next.js)

   ```bash
   cd ../../frontend
   npm install
   # or
   yarn
   ```

### Configuration

Create a `.env` (backend) and a `.env.local` (frontend) with the following:

<details>
<summary><strong>BackEnd/FlightBooking/.env</strong></summary>

```ini
# MySQL
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/flight_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_mysql_password

# JWT (if used)
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION_MS=86400000
```

</details>

<details>
<summary><strong>frontend/.env.local</strong></summary>

```ini
NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key
NEXT_PUBLIC_RAPIDAPI_HOST=your_rapidapi_host
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

</details>

---

## Running the App

### Backend

```bash
cd BackEnd/FlightBooking
mvn spring-boot:run
```

The API server will start on **[http://localhost:8080](http://localhost:8080)** by default.

### Frontend

```bash
cd frontend
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
Flight-Booking/
├── BackEnd/
│   └── FlightBooking/      # Spring Boot project
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/   # Controllers, Services, Repositories
│       │   │   └── resources/ # application.yml, schema.sql
│       └── pom.xml
├── frontend/               # Next.js + TypeScript
│   ├── app/                # shadcn/ui-based pages & layout
│   ├── components/         # Reusable React components
│   ├── styles/             # Tailwind config
│   ├── public/             # Static assets
│   └── package.json
└── .gitignore
```

---

## API Reference

| Endpoint                 | Method | Description                        |
| ------------------------ | :----: | ---------------------------------- |
| `/api/flights/search`    |  `GET` | Search flights by origin/dest/date |
| `/api/bookings`          | `POST` | Create a new booking               |
| `/api/bookings/{userId}` |  `GET` | Get bookings for a user            |
| `/api/auth/signup`       | `POST` | User registration                  |
| `/api/auth/login`        | `POST` | User authentication (JWT response) |

---

## Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

Please adhere to the existing code style and write tests for new functionality where applicable.

---

## License

Distributed under the [MIT License](LICENSE).

---

## Contact

**Nityasundar Mondal**

* GitHub: [@nityasundar2743](https://github.com/nityasundar2743)
* Email: [nityasundar2743@gmail.com](mailto:nityasundar2743@gmail.com)

Project Link: [https://github.com/nityasundar2743/Flight-Booking](https://github.com/nityasundar2743/Flight-Booking)

```

**Next Steps:**  
- Double-check that all environment-variable names match your code.  
- Add any missing API routes or notes on authentication, pagination, etc.  
- Include screenshots or GIFs of the UI in a “Demo” section if you like.  

Let me know if you’d like any adjustments!
```
