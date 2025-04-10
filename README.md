# Nassdaq Stock Search - Thndr

## Proccess of building app and my thoughts

I started by creating a new project using Next.js and installed the Tailwind CSS and axios, and I made a simple get request to the polygon.io api to get the stocks and it worked fine but then I thought why I'm using a framework that I would not benefit from? so I decided to use vite and create a new react app and install the tailwind css and axios, and I made a simple get request to the polygon.io api to get the stocks and it worked fine. but then I thought about maintanability and scalability so I decided to use zustand to manage the state and I made a simple search functionality and for the data fetching I used react-query and I made a simple infinite scroll component and I used the react-infinite-scroll-component library to implement the infinite scroll.

## Project Overview

This is a stock market application that displays stocks listed on the Nasdaq exchange. It allows users to search for specific stocks and view detailed information.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd thndr-nasdaq
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up API Key:**

   - Obtain an API key from [Polygon.io](https://polygon.io/).
   - Create a `.env` file in the root directory and add your API key:
     ```
     REACT_APP_API_KEY=your_api_key_here
     ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

## Features

- Display stocks listed on the Nasdaq exchange.
- Search functionality to find specific stocks.
- Infinite scrolling to load more stocks.
- Responsive design for various screen sizes.

## Technologies Used

- React
- TypeScript
- Tailwind CSS for styling
- React-query for data fetching

## Testing

- To run tests, use the following command:
  ```bash
  npm test
  ```

## Contributing

- Contributions are welcome! Please fork the repository and submit a pull request.
