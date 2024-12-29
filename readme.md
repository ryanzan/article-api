
# Article App

A simple application for CRUD operations of article.

## Running with Docker

1. **Update env:**  
   Before building the Docker image, you need to configure the environment variables. Copy the `.env.example` file to `.env` and update the configuration as needed. 


2. **Build Docker Image:**
   ```bash
   docker build -t article-app .
   ```

3. **Run Docker Container:**
   ```bash
   docker run -p 3000:3000 article-app
   ```
4. **Access the application:**
   ```bash
   http://localhost:3000
   ```
5. **Access the API documentation:**
   ```bash
   http://localhost:3000/api-docs
   ```
6. **Access the uploaded images:**
   ```bash
   http://localhost:3000/uploads/<image_path>
   ```
