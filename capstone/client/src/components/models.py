from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Animal(db.Model, SerializerMixin):
    __tablename__ = 'animals'

    serialize_rules = ('-orders',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    species = db.Column(db.String)
    date_tag = db.Column(db.String)
    start_loc = db.Column(db.String)
    last_ping = db.Column(db.String)
    size = db.Column(db.String)
    type = db.Column(db.String)
    image = db.Column(db.String, nullable=False)
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    research_id = db.Column(db.Integer, db.ForeignKey('researchers.id'))

    orders = db.relationship('Order', backref='animal')
    users = association_proxy('orders', 'user')

    @validates('type')
    def validates_type(self, key, type):
        all = ["Shark", "Turtle", "Dolphin"]
        if type in all:
            return type
        else:
            raise Exception("Not valid animal")


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-orders',)

    id = db.Column(db.Integer, primary_key=True)
    first_last = db.Column(db.String)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String)

    orders = db.relationship('Order', backref='user')
    animals = association_proxy('orders', 'animal')

    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError("Failed simple email validation")
        return address
    
    @validates('password')
    def validates_password(self, key, password):
        if len(str(password)) >= 8:
            return password
        else:
            raise Exception("Password must be at least 8 characters")
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )
    
class Research(db.Model, SerializerMixin):
    __tablename__ = 'researchers'

    serialize_rules = ('animals.id',)

    id = db.Column(db.Integer, primary_key=True)
    first_last = db.Column(db.String)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String)

    animals = db.relationship('Animal', backref='researcher')

    @validates('password')
    def validates_password(self, key, password):
        if len(str(password)) >= 8:
            return password
        else:
            raise Exception("Password must be at least 8 characters")
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )



class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    serialize_rules = ('-animal_id', '-user_id')

    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
