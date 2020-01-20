from flask import Flask, request, render_template, jsonify, make_response
# import json
import threading
import time
from datetime import datetime
import requests
from Student import Student, skills_enum, courses_enum
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app, resources={r"/students/*": {"origins": "http://localhost:3000/"}})

students = {
    "Hermione Granger": Student(0, "Hermione", "Granger", datetime.now().isoformat(), datetime.now().isoformat(), None, None, None).__dict__,
    "Harry Potter": Student(1, "Harry", "Potter", datetime.now().isoformat(), datetime.now().isoformat(), None, None, None).__dict__,
}

response_headers = {'Access-Control-Allow-Origin': 'http://localhost:3000'}


@app.route("/")
def index_page():
    # print(f"Response count: {counter}")
    return f'<h1>Hogwarts CRM Backend</h1><a href="/students/">Students List</a>'


@app.route("/skills/")
def get_skills():
    return make_response(jsonify(skills_enum), response_headers)


@app.route("/courses-list/")
def get_courses():
    return make_response(jsonify(courses_enum), response_headers)


@app.route("/students/")
def show_students():
    response = make_response(jsonify(students), response_headers)
    # response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response


@app.route("/students/<string:student_name>")
def show_student(student_name):
    return make_response(jsonify(students[student_name]), response_headers)


@app.route("/students/edit/", methods=['POST'])
@cross_origin(origin="http://localhost:3000")
def edit_student():
    global students
    payload = request.get_json()
    student_name = payload["name"]   
    list = payload["list"]
    skill_name = payload["skill"]
    if payload["action"] == "skills":
        students[student_name][list][skill_name] = payload["level"]
        print(students[student_name][list][skill_name])
        return f"Success! Skill changed: {skill_name}"
    
    if payload["action"] == "remove-skill":
        students[student_name][list].pop(skill_name)
        print(students)
        return f"Success! Removed skill: {skill_name}"

    if payload["action"] == "remove-course":
        courses_list = students[student_name]["courses"]
        courses_list.pop(courses_list.index(payload["course"]))
        print(students[student_name])
        return f"Success! Removed course: {payload['course']}"


@app.route("/students/new-student/", methods=['POST'])
@cross_origin(origin="http://localhost:3000")
def add_student():
    print("Adding Student")
    global students
    payload = request.get_json()
    student_id = len(students)
    first_name = payload["first_name"]
    last_name = payload["last_name"]
    creation_time = datetime.now().isoformat()
    last_updated = creation_time
    magic_skills = payload["skills"]
    desired_magic_skills = payload["desired_skills"]
    courses = payload["courses"]
    full_name = f"{first_name} {last_name}"
    print(f"Added this student: {full_name}")
    students[full_name] = Student(
        student_id,
        first_name,
        last_name,
        creation_time,
        last_updated,
        magic_skills,
        desired_magic_skills,
        courses
    ).__dict__
    return f"SUCCESS! There are {str(len(students))} students in the system now. Got json: {request.get_json()}"


if __name__ == "__main__":
    threading.Thread(target=app.run(debug=True), kwargs=dict(threaded=True)).start()
    time.sleep(0.5)
    response = requests.get('http://127.0.0.1:5000')
    if response.status_code == 200:
        print('OK')
        # print(f"Req per second: {counter}")
    else:
        print('Error')
