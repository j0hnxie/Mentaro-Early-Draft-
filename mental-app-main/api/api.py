import database

from flask import Flask, request
from datetime import datetime

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'
folder = app.config['UPLOAD_FOLDER']

@app.route('/api/time')
def get_current_time():
    return {'time': datetime.utcnow()}

@app.route('/api/login', methods=['POST'])
def login():
    return_obj = {'id': -1, 'username': "", 'success': False}
    username = request.json['username']
    return_obj['username'] = username

    password = request.json['password']
    print(username, password)

    id = database.login(username, password)
    if id is not None:
      return_obj['success'] = True
      return_obj['id'] = id
    return return_obj

@app.route('/api/submit_form', methods=['POST'])
def submit_form():
  print(request.json)
  return {'success': True}