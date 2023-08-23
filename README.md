# Static Webpage with Authentication

Serves static webpage with authentication implemented with firebase authentication.

# Usage

### 1. Create a firebase project.

You need to create a firebase project and enable google authentication to use it.

### 2. Add users that you want to allow to access the webpage.

Create a collection named `admin` at firestore and add documents with the following fields.

- `email`: email address of the user. Must be the same as the email address of the google account.

If you want to change the name of the collection, you can change it by declaring the environment variable `FIRESTORE_ADMIN_COLLECTION`. See [.env.sample](./.env.sample) for more details.

### 3. Create a `.env` file and fill in the values.

Create a `.env` file at the root directory and fill in the values.
[.env.sample](./.env.sample) is a sample file that you can use. See the comments in the file for more details.

### 4. Build static pages and run the docker image.

Build static pages with your preferred static site generator and run the docker image with the source files generated.
See [Basic Dockerfile Example](./example/basic-example/Dockerfile) for more details.

# Contribution

Any contribution is welcome. Please feel free to open an issue or a pull request.
