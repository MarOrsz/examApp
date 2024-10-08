# coding=utf-8
from flask_cors import CORS

from flask import Flask, jsonify, request

from .entities.entity import Session, engine, Base
from .entities.exam import Exam, ExamSchema

# creating the Flask application
app = Flask(__name__)
CORS(app)

# if needed, generate database schema
Base.metadata.create_all(engine)


@app.route('/exams')
def get_exams():
    # fetching from the database
    session = Session()
    exam_objects = session.query(Exam).all()

    # transforming into JSON-serializable objects
    schema = ExamSchema(many=True)
    exams = schema.dump(exam_objects)

    # serializing as JSON
    session.close()
    return jsonify(exams)


@app.route('/exams', methods=['POST'])
def add_exam():
    # mount exam object
    posted_exam = ExamSchema(only=('title', 'description', 'long_description'))\
        .load(request.get_json())

    exam = Exam(**posted_exam, created_by="HTTP post request")

    # persist exam
    session = Session()
    session.add(exam)
    session.commit()

    # return created exam
    new_exam = ExamSchema().dump(exam)
    session.close()
    return jsonify(new_exam), 201

@app.route('/exams/<examId>', methods=['DELETE'])
def delete_exam(examId):
    session = Session()
    exam = session.query(Exam).filter_by(id = examId).first()
    session.delete(exam)
    session.commit()
    session.close()

    return '', 201