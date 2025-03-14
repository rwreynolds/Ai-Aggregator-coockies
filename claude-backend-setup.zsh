#!/bin/bash

# Create main directory structure
# mkdir -p backend
cd backend

# Create application structure
mkdir -p app/api
mkdir -p app/models
mkdir -p app/services
mkdir -p app/utils
mkdir -p app/auth
mkdir -p app/database
mkdir -p app/config
mkdir -p app/static

# Create Docker related files
touch Dockerfile
touch docker-compose.yml
touch .dockerignore

# Create main application files
touch app/__init__.py
touch app/app.py
touch app/wsgi.py
touch app/config/__init__.py
touch app/config/config.py

# Create API endpoints
touch app/api/__init__.py
touch app/api/routes.py
touch app/api/user_routes.py
touch app/api/auth_routes.py
touch app/api/chat_routes.py
touch app/api/settings_routes.py

# Create database models and handlers
touch app/database/__init__.py
touch app/database/postgres.py
touch app/database/mongodb.py

# Create service connectors
touch app/services/__init__.py
touch app/services/openai_service.py
touch app/services/anthropic_service.py
touch app/services/google_service.py
touch app/services/mistral_service.py
touch app/services/service_factory.py

# Create models
touch app/models/__init__.py
touch app/models/user.py
touch app/models/chat.py
touch app/models/settings.py

# Create auth handlers
touch app/auth/__init__.py
touch app/auth/jwt_handler.py
touch app/auth/password_handler.py

# Create utils
touch app/utils/__init__.py
touch app/utils/validators.py
touch app/utils/helpers.py

# Create requirements file
touch requirements.txt

# Create environment variables file
touch .env.example

echo "Backend directory structure created successfully!"