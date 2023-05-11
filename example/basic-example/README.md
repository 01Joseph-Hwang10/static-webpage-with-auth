# static webpage with auth basic example

## Getting started

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Copy `.env.example` at the root directory and paste at this directory as `.env` and fill in the values
3. Run the following command to start the server

```bash
docker build . -t static-webpage-with-auth-example
docker run -d -p 3000:3000 --env-file .env static-webpage-with-auth-example
```

4. Open http://localhost:3000 in your browser and see if it works

