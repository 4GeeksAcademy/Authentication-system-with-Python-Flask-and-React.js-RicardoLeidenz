"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/sign_up', methods=['POST'])
def handle_sign_up():
    body = request.json
    new_email = body["email"]
    new_password = body["password"]
    new_user = User(
        email=new_email,
        password=generate_password_hash(new_password)
    )
    db.session.add(new_user)
    response_body = {
        "message": "User created successfully!",
        "user": new_user.serialize()
    }
    db.session.commit()
    return jsonify(response_body), 200


@api.route('/log_in', methods=['POST'])
def handle_log_in():
    body = request.json
    user_email = body["email"]
    user_password = body["password"]
    user = User.query.filter_by(email=user_email).first()

    if not user:
        response_body = {
            "message": "Invalid User entered"
        }
        return jsonify(response_body), 400

    if not check_password_hash(user.password, user_password):
        response_body = {
            "message": "Invalid Password entered"
        }
        return jsonify(response_body), 400

    token = create_access_token(identity=user_email)

    response_body = {
        "message": "Welcome back! ",
        "user": user.serialize(),
        "token": token
    }
    return jsonify(response_body), 200


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        response_body = {
            "message": "Invalid User entered",
        }
        return jsonify(response_body), 400

    response_body = {
        "message": "User fetched successfully!",
        "user": user.serialize()
    }
    return jsonify(response_body), 200
