from app.database.postgres import db
import uuid
import os


class Settings(db.Model):
    """Settings model for user preferences."""
    __tablename__ = 'settings'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, unique=True)
    default_service = db.Column(db.String(50), default=os.getenv('DEFAULT_SERVICE', 'openai'))
    default_model = db.Column(db.String(50), default=os.getenv('DEFAULT_MODEL', 'gpt-3.5-turbo'))
    temperature = db.Column(db.Float, default=float(os.getenv('DEFAULT_TEMPERATURE', 0.7)))
    max_tokens = db.Column(db.Integer, default=int(os.getenv('DEFAULT_MAX_TOKENS', 1000)))
    default_assistant_id = db.Column(db.String(255), nullable=True)

    def __init__(self, user_id, default_service=None, default_model=None,
                 temperature=None, max_tokens=None, default_assistant_id=None):
        self.user_id = user_id
        self.default_service = default_service or os.getenv('DEFAULT_SERVICE', 'openai')
        self.default_model = default_model or os.getenv('DEFAULT_MODEL', 'gpt-3.5-turbo')
        self.temperature = temperature or float(os.getenv('DEFAULT_TEMPERATURE', 0.7))
        self.max_tokens = max_tokens or int(os.getenv('DEFAULT_MAX_TOKENS', 1000))
        self.default_assistant_id = default_assistant_id

    def to_dict(self):
        """Convert settings object to dictionary."""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'default_service': self.default_service,
            'default_model': self.default_model,
            'temperature': self.temperature,
            'max_tokens': self.max_tokens,
            'default_assistant_id': self.default_assistant_id
        }

    @classmethod
    def find_by_user_id(cls, user_id):
        """Find settings by user_id."""
        return cls.query.filter_by(user_id=user_id).first()

    def save(self):
        """Save settings to database."""
        db.session.add(self)
        db.session.commit()

    def update(self, **kwargs):
        """Update settings."""
        for key, value in kwargs.items():
            if hasattr(self, key) and value is not None:
                setattr(self, key, value)

        db.session.commit()