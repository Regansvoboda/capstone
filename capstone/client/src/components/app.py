#!/usr/bin/env python3

from flask import Flask, make_response, jsonify, request, session, flash
from flask_migrate import Migrate
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS
# import boto3
import os

from config import app, db, api, bcrypt
from models import db, User, Animal, Order, Research


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
api = Api(app)

CORS(app)

db.init_app(app)

@app.route('/')
def index():
    return '<h1>Capstone</h1>'

class Animals(Resource):
    def get(self):
        a_list = []
        for a in Animal.query.all():
            a_dict = {
                'id': a.id,
                'name': a.name,
                'species': a.species,
                'date_tag': a.date_tag,
                'start_loc': a.start_loc,
                'last_ping': a.last_ping,
                'size': a.size,
                'type': a.type
            }
            a_list.append(a_dict)
        return make_response(a_list, 200) 
    
    def post(self):
        data = request.get_json()
        animal = Animal(name = data['name'],
                    type = data['type'],
                    species = data['species'],
                    date_tag = data['date_tag'],
                    start_loc = data['start_loc'],
                    last_ping = data['last_ping'],
                    size = data['size']
                    )
        db.session.add(animal)
        db.session.commit()
        return make_response(animal.to_dict(), 201)

api.add_resource(Animals, '/animals')

class GetAnimalsById(Resource):
    def get(self, id):
        a_instance = Animal.query.filter_by(id=id).first()
        if a_instance == None:
            return make_response({'Error': 'Animal Not Found'}, 404)
        return make_response(a_instance.to_dict(), 200)

api.add_resource(GetAnimalsById, '/animals/<int:id>')

class Users(Resource):
    def get(self):
        u_list = []
        for u in User.query.all():
            u_dict = {
                'id': u.id,
                'first_last': u.first_last,
                'username': u.username,
                'password': u._password_hash,
                'email': u.email
            }
            u_list.append(u_dict)
        return make_response(u_list, 200)
    
    def post(self):
        data = request.get_json()
        user = User(first_last = data['first_last'],
                    username = data['username'],
                    password = data['_password_hash'],
                    email = data['email'],
                    )
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 201)
    
api.add_resource(Users, '/users')

class GetUsersById(Resource):
    def get(self, id):
        u_instance = User.query.filter_by(id=id).first()
        if u_instance == None:
            return make_response({'Error': 'User Not Found'}, 404)
        return make_response(u_instance.to_dict(), 200)

    def delete(self, id):
        use = User.query.filter_by(id = id).first()
        if use == None:
            return make_response({"error": "User not found"}, 404)
        db.session.delete(use)
        db.session.commit()
        return make_response('Account deleted', 200)
    
    def patch(self, id):
        u = User.query.filter_by(id=id).first()
        if u == None:
            return make_response({'error': 'User not found'}, 404)
        data = request.get_json()
        for key in data.keys():
            setattr(u, key, data[key])
        db.session.add(u)
        db.session.commit()
        return make_response(u.to_dict(), 200)

api.add_resource(GetUsersById, '/users/<int:id>')

class Signup(Resource):
    def post(self):
            data = request.get_json()
            new_user = User(username=data.get('username'), email=data.get('email'))
            if new_user == None:
                make_response({'error': 'not created'}, 422)
            new_user.password_hash = data.get('password')
            
            db.session.add(new_user)
            db.session.commit()
            
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)
        
api.add_resource(Signup, '/signup')

class CheckSession(Resource):

    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return make_response(user.to_dict(), 200)
        else:
            return {'message': '401: Not Authorized'}, 401

class Update_Profile(Resource):
    def get(self):
        the_user =User.query.filter_by(id=session['user_id']).first()
        the_user.update_activity()

        return make_response(the_user.to_dict(only=('first_last', 'username', 'email')))
        


    def patch(self):
        the_user =User.query.filter_by(id=session['user_id']).first()
        the_user.update_activity()

        if request.values['fileExists'] == 'true':
            print(request.values['fileExists'])
            s3 = boto3.resource('s3', aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                                aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'))
            bucket = s3.Bucket('animal-tracker')
            test = bucket.put_object(Key=file.filename, Body=file)
            file_url = f"https://{bucket.name}.s3.amazonaws.com/{file.filename}"
        else:
            file = None

        if  not(request.values['currentPassword'] == 'null') and not(request.values['newPassword'] == 'null'):

            if the_user.authenticate(request.values['currentPassword']):
                the_user.password_hash = request.values['newPassword']
                db.session.add(the_user)
                db.session.commit()

class Login(Resource):
    def post(self):

        email = request.get_json()['email']
        password = request.get_json()['password']
        user = User.query.filter_by(email = email).first()
        
        if user.authenticate(password) == True:
            session['user_id'] = user.id
            return user.to_dict()

        elif user is None:
            return {'error': 'Invalid email or password'}, 401

        else:
            return {'error', 'Invalid email or password'}, 401
api.add_resource(Login, '/login')

class Orders(Resource):
    def get(self):
        o_list = []
        for o in Order.query.all():
            o_dict = {
                'id': o.id,
                'user_id': o.user_id,
                'animal_id': o.animal_id,
                'order_date': o.created_at
            }
            o_list.append(o_dict)
        return make_response(o_list, 200)
    
    def post(self):
        data = request.get_json()
        order = Order(user_id = data['user_id'],
                    animal_id = data['animal_id'],
                    )
        db.session.add(order)
        db.session.commit()
        return make_response(order.to_dict(), 201)
    
api.add_resource(Orders, '/orders')

class GetOrdersById(Resource):
    def get(self, id):
        o_instance = Order.query.filter_by(id=id).first()
        if o_instance == None:
            return make_response({'Error': 'Order Not Found'}, 404)
        return make_response(o_instance.to_dict(), 200)
    
    def delete(self, id):
        ord = Order.query.filter_by(id = id).first()
        if ord == None:
            return make_response({"error": "Order not found"}, 404)
        db.session.delete(ord)
        db.session.commit()
        return make_response('Order deleted', 200)
    
api.add_resource(GetOrdersById, '/orders/<int:id>')

class Researchers(Resource):
    def get(self):
        r_list = []
        for r in Research.query.all():
            r_dict = {
                'id': r.id,
                'first_last': r.first_last,
                'username': r.username,
                'password': r._password_hash,
                'email': r.email
            }
            r_list.append(r_dict)
        return make_response(r_list, 200)
    
    def post(self):
        data = request.get_json()
        research = Research(first_last = data['first_last'],
                    username = data['username'],
                    password = data['_password_hash'],
                    email = data['email'],
                    )
        db.session.add(research)
        db.session.commit()
        return make_response(research.to_dict(), 201)
    
api.add_resource(Researchers, '/researchers')

class GetResearchersById(Resource):
    def get(self, id):
        r_instance = Research.query.filter_by(id=id).first()
        if r_instance == None:
            return make_response({'Error': 'Researcher Not Found'}, 404)
        return make_response(r_instance.to_dict(), 200)

    def delete(self, id):
        res = Research.query.filter_by(id = id).first()
        if res == None:
            return make_response({"error": "Researcher not found"}, 404)
        db.session.delete(res)
        db.session.commit()
        return make_response('Account deleted', 200)
    
    def patch(self, id):
        r = Research.query.filter_by(id=id).first()
        if r == None:
            return make_response({'error': 'Researcher not found'}, 404)
        data = request.get_json()
        for key in data.keys():
            setattr(r, key, data[key])
        db.session.add(r)
        db.session.commit()
        return make_response(r.to_dict(), 200)
    
api.add_resource(GetResearchersById, '/researchers/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
