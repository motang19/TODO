from app import app
from flask import render_template
from app import database as dbhelper
@app.route("/")
def homepage():
    items = dbhelper.todo_items()
    return render_template("index.html", items = items)