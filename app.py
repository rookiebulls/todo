from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import sys
import os


app = Flask(__name__)
app.config['SECRET_KEY'] = 'rookiebulls_354_353113'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join('.', 'db.sqlite')
db = SQLAlchemy(app)

from models import ToDoMsg


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/todo', methods=['GET'])
def get_todo_msg():
    todos = ToDoMsg.query.all()
    return jsonify(messages=[dict(id=todo.id,
                                  msg=todo.msg,
                                  finished=todo.finished) for todo in todos])


@app.route('/todo', methods=['POST'])
def add_todo_msg():
    data = request.get_json(force=True)
    todo = ToDoMsg(msg=data['msg'])
    db.session.add(todo)
    db.session.commit()
    return jsonify({'id': todo.id,
                    'msg': todo.msg,
                    'finished': todo.finished})


@app.route('/todo', methods=['PUT'])
def update_todo_msg():
    data = request.get_json(force=True)
    todo = ToDoMsg.query.get_or_404(data['id'])
    todo.finished = data['finished']
    db.session.add(todo)
    db.session.commit()
    return jsonify({'id': todo.id,
                    'msg': todo.msg,
                    'finished': todo.finished})


@app.route('/todo/<int:id>', methods=['DELETE'])
def delete_todo_msg(id):
    todo = ToDoMsg.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify({'result': True})


if __name__ == '__main__':
    if sys.argv[1:] == ['initdb']:
        print 'initializing database...'
        db.drop_all()
        db.create_all()
        print 'done'
    else:
        app.run(debug=True)

