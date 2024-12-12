# API Docs for the Frontend

### Base URL:
http://localhost:5000/api/auth

### 1. **Signup** (`POST /signup`)

- **What it does**: This endpoint is for creating a new user.

- **Frontend Elements**:
    - **Email**: A textbox where the user enters their email (e.g., `email@example.com`).
    - **Password**: A textbox for the password (e.g., `yourpassword`).
    - **Username**: A textbox for the username (e.g., `username123`).
    - **Button**: A "Sign Up" button to send the data.

- **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "yourpassword",
        "username": "username123"
    }
    ```

- **Responses**:
    - **201 Created**:
        ```json
        {
            "message": "User registered successfully"
        }
        ```
    - **400 Bad Request**: Missing or invalid fields.
    - **409 Conflict**: If the email or username already exists.

### 2. **Login** (`POST /login`)

- **What it does**: Logs the user in with their email and password.

- **Frontend Elements**:
    - **Email**: A textbox for the user’s email.
    - **Password**: A textbox for the user’s password.
    - **Button**: A "Login" button to submit the form.

- **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "yourpassword"
    }
    ```

- **Responses**:
    - **200 OK**:
        ```json
        {
            "message": "User logged in successfully",
            "token": "jwt_token"
        }
        ```
        You'll get a JWT token. Store it and send it in the header for any future requests that need authentication.
    - **400 Bad Request**: Missing fields or incorrect data.
    - **401 Unauthorized**: Wrong email or password.

### 3. **Forgot Password** (`POST /forgot-password`)

- **What it does**: Sends a password reset email to the user.

- **Frontend Elements**:
    - **Email**: A textbox where the user enters their email to receive the reset link.
    - **Button**: A "Forgot Password" button to trigger the reset.

- **Request Body**:
    ```json
    {
        "email": "user@example.com"
    }
    ```

- **Responses**:
    - **200 OK**:
        ```json
        {
            "message": "Password reset email sent"
        }
        ```
    - **400 Bad Request**: Missing or invalid email.
    - **404 Not Found**: If no user is found with that email.
