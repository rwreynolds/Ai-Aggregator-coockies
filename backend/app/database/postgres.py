from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
import os

# Initialize SQLAlchemy
db = SQLAlchemy()
Base = declarative_base()


# Create engine and session
def init_db(app):
    """Initialize the SQLAlchemy database with Flask app."""
    db.init_app(app)

    with app.app_context():
        # Import models to ensure they're registered with SQLAlchemy
        from app.models.user import User
        from app.models.settings import Settings

        # Create tables if they don't exist
        db.create_all()


def get_db_session():
    """Get a new database session."""
    engine = create_engine(os.getenv("DATABASE_URL"))
    session_factory = sessionmaker(bind=engine)
    Session = scoped_session(session_factory)
    return Session()


def close_db_session(session):
    """Close the database session."""
    if session:
        session.close()