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


# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SECRET_KEY'] = 'your-secret-key'  # Replace with your own secret key
# app.config['JWT_SECRET_KEY'] = 'jwt-secret-key'  # Replace with your own JWT secret key
# app.json.compact = False

# app.secret_key = 'flatiron'




# bcrypt = Bcrypt(app)
# jwt = JWTManager(app)





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
                'type': a.type,
                'image': a.image
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
                    size = data['size'],
                    image = data['image']
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
    def delete(self, id):
        animal = Animal.query.filter_by(id = id).first()
        if animal == None:
            return make_response({"error": "Animal not found"}, 404)
        db.session.delete(animal)
        db.session.commit()
        return make_response('Animal deleted', 200)

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

class Update_Profile(Resource):
    def get(self):
        the_user =User.query.filter_by(id=session['user_id']).first()
        the_user.update_activity()

        return make_response(the_user.to_dict(only=('email')))
        

    def patch(self):
        the_user =User.query.filter_by(id=session['user_id']).first()
        the_user.update_activity()

        if  not(request.values['currentPassword'] == 'null') and not(request.values['newPassword'] == 'null'):

            if the_user.authenticate(request.values['currentPassword']):
                the_user.password_hash = request.values['newPassword']
                db.session.add(the_user)
                db.session.commit()

        email = request.values['email']
        
        the_user.email = email

        db.session.add(the_user)
        db.session.commit()
        return 'Updated successfully!'

api.add_resource(Update_Profile, '/update-profile')

class Login(Resource):
    def post(self):

        email = request.get_json()['email']
        password = request.get_json()['password']
        user = User.query.filter_by(email = email).first()
        
        if user is not None and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict()

        elif user is None:
            return {'error': 'Invalid email or password'}, 401

        else:
            return {'error', 'Invalid email or password'}, 401

class ResearchLogin(Resource):
    def post(self):

        email = request.get_json()['email']
        password = request.get_json()['password']
        research = Research.query.filter_by(email = email).first()
        
        if research is not None and research.authenticate(password):
            session['research_id'] = research.id
            return research.to_dict()

        elif research is None:
            return {'error': 'Invalid email or password'}, 401

        else:
            return {'error', 'Invalid email or password'}, 401
    
class ResearchLogout(Resource):
   def delete(self):
        session['research_id'] = None
        return {}, 204
   
class Logout(Resource):
   def delete(self):
        session['user_id'] = None
        return {}, 204

class CheckSession(Resource):

    def get(self):

        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200

        return {}, 401
        
# @app.route('/check_username', methods=['POST'])
# def check_username():
#     username = request.json.get('username')
#     existing_user = User.query.filter(User.username == username).first()
#     if existing_user:
#         return jsonify({'status': 'error', 'message': 'Username is already taken'}), 400
#     else:
#         return jsonify({'status': 'ok'}), 200

class SignUp(Resource):
    def post(self):

        username = request.json['username']
        email = request.json['email']
        password = request.json['password']
        first_last = request.json['first_last']

        user_exists = User.query.filter(User.username == username).first() is not None

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password)
        new_user = User(
            username=username,
            email=email,
            _password_hash=hashed_password,
            first_last=first_last,
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict()

api.add_resource(SignUp, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(ResearchLogin, '/researchlogin', endpoint='researchlogin')
api.add_resource(ResearchLogout, '/researchlogout', endpoint='researchlogout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')


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
        o = Order.query.filter_by(id = id).first()
        if o == None:
            return make_response({'error': 'no animals found'}, 404)
        return make_response(o.to_dict(), 200)
    
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
