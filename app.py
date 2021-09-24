import os
from flask import Flask, render_template, redirect, flash, request
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)


engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

@app.route("/")
def index():
    funciones = ["agregar", "listar"]
    return render_template("index.html", funciones = funciones)

@app.route("/agregar", methods=["GET", "POST"])
def agregar():
    if request.method =="GET":
        return render_template("agregar.html")
    else:
        name = request.form.get("name")
        year = int(request.form.get("year"))
        description = request.form.get("description")
        image = request.form.get("image")

        # realizar validación

        db.execute("""
            INSERT INTO movies (name, year, description, image) 
            VALUES (:name, :year, :description, :image) 
        """,{
            "name": name, "year": year, "description": description, "image": image
        })
        db.commit()

        return redirect("/listar")  



@app.route("/listar")
def listar():
    rows = db.execute("SELECT * FROM movies").fetchall()
    return render_template("listar.html", rows=rows)