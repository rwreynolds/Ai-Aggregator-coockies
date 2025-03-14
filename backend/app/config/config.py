import os
from datetime import timedelta
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Config:
    """Base configuration."""
    # Flask settings
    SECRET_KEY = os.getenv("SECRET_KEY", "development-key")
    DEBUG = os.getenv("DEBUG", "False") == "True"

    # JWT settings
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret-key")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", 3600)))
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(seconds=int(os.getenv("JWT_REFRESH_TOKEN_EXPIRES", 604800)))
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_HEADER_NAME = "Authorization"
    JWT_HEADER_TYPE = "Bearer"

    # Database settings
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/ai_aggregator")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/ai_aggregator")

    # AI Service settings
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
    MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY", "")

    # Default model settings
    DEFAULT_MODEL = os.getenv("DEFAULT_MODEL", "gpt-3.5-turbo")
    DEFAULT_SERVICE = os.getenv("DEFAULT_SERVICE", "openai")
    DEFAULT_TEMPERATURE = float(os.getenv("DEFAULT_TEMPERATURE", 0.7))
    DEFAULT_MAX_TOKENS = int(os.getenv("DEFAULT_MAX_TOKENS", 1000))


class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True


class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    JWT_SECRET_KEY = "testing-jwt-key"
    SECRET_KEY = "testing-key"


class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False
    TESTING = False


# Dictionary with different configuration environments
config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig
}