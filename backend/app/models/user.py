from app.database.postgres import db
from datetime import datetime
import uuid


class User(db.Model):
    """User model for handling authentication and user data."""
    __tablename__ = 'users'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email_verified = db.Column(db.DateTime, nullable=True)
    image = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship with Settings
    settings = db.relationship('Settings', backref='user', lazy=True, uselist=False)

    def __init__(self, name, email, password, image=None):
        self.name = name
        self.email = email
        self.password = password
        self.image = image

    def to_dict(self):
        """Convert user object to dictionary."""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'email_verified': self.email_verified.isoformat() if self.email_verified else None,
            'image': self.image,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

    @classmethod
    def find_by_email(cls, email):
        """Find user by email."""
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, user_id):
        """Find user by id."""
        return cls.query.filter_by(id=user_id).first()

    def save(self):
        """Save user to database."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Delete user from database."""
        db.session.delete(self)
        db.session.commit()