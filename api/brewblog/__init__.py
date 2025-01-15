from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from os import environ as env
from dotenv import find_dotenv, load_dotenv
from authlib.integrations.flask_oauth2 import ResourceProtector
from flask_cors import CORS
from brewblog.auth import Auth0JWTBearerTokenValidator
from config import Config

ENV = find_dotenv('.env')
if ENV:
  load_dotenv(ENV)

db = SQLAlchemy()
migrate = Migrate()
require_auth = ResourceProtector()

def create_app(config_class=Config):
  app = Flask(__name__)
  app.config.from_object(config_class)
  app.secret_key = env.get("APP_SECRET_KEY")

  db.init_app(app)
  migrate.init_app(app, db)

  CORS(app, origins="*", supports_credentials=True)

  validator = Auth0JWTBearerTokenValidator(
    env.get("AUTH0_DOMAIN"),
    env.get("AUTH0_AUDIENCE")
  )
  require_auth.register_token_validator(validator)

  from brewblog.beer import bp as beer_bp
  app.register_blueprint(beer_bp)

  from brewblog.brewery import bp as brewery_bp
  app.register_blueprint(brewery_bp)

  from brewblog.errors import bp as errors_bp
  app.register_blueprint(errors_bp)

  return app

from brewblog import models