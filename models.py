from __main__ import db


class ToDoMsg(db.Model):
    __tablename__ = 'message'

    id = db.Column(db.Integer, primary_key=True)
    msg = db.Column(db.Text, index=True)
    finished = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return '<message of %s>' % (self.msg,)
