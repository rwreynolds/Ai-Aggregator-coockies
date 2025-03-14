import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

# Initialize extensions
bcrypt = Bcrypt()
jwt = JWTManager()


def create_app(config=None):
    app = Flask(__name__)

    # Load config
    if config is None:
        app.config.from_object('app.config.config.Config')
    else:
        app.config.from_object(config)

    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Import and register blueprints
    from app.api.routes import api_bp
    from app.api.auth_routes import auth_bp
    from app.api.user_routes import user_bp
    from app.api.chat_routes import chat_bp
    from app.api.settings_routes import settings_bp

    app.register_blueprint(api_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(settings_bp)

    # Register error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {"error": "Not found"}, 404

    @app.errorhandler(500)
    def internal_error(error):
        return {"error": "Internal server error"}, 500

    return app