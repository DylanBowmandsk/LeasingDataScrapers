from flask import Flask, jsonify
from flask_cors import CORS
import leasingScraper
import leaseLocoScraper
import selectLeasingScraper
import csv
import sqlconnector

app = Flask(__name__)
CORS(app)

db = sqlconnector.initialiseDB()
cursor = db.cursor()

@app.route("/")
def index():
    return "API ENTRY"

@app.route("/get/makes")
def getPvMakes():
    makes = []
    for i, make in cursor.execute("select * from [Make Master] where not Make = ''"):
        if make != "":
            makes.append({"makeID": i,
            "makeName": make})
    return jsonify(makes)

@app.route("/get/models")
def getPvModels():
    models = []
    for id, makeID , model in cursor.execute("select UniqueID, MakeID, Model from [Model Master] where not Model = ''"):
        if model != "":
            models.append({"modelID" : id,
            "makeID": makeID,
            "model": model})
            print(id,makeID,model)
    return jsonify(models)

@app.route("/leasingcom/get/makes")
def getLeasingcomBrands():
    return jsonify(leasingScraper.scrapeMakeList())

@app.route("/leasingcom/get/<make>/model")
def getLeasingcomRange(make):
    return jsonify(leasingScraper.scrapeModelList(make))

@app.route("/leasingcom/scrape/<make>/<model>")
def scrapeLeasingcom(make,model):
    return jsonify(leasingScraper.scrape(make,model))

@app.route("/leaseloco/scrape/<make>/<model>")
def scrapeLeaseLoco(make, model):
    return jsonify(leaseLocoScraper.scrape(make, model))

@app.route("/selectleasing/scrape/<make>/<model>")
def scrapeSelectLeasing(make,model):
    return jsonify(selectLeasingScraper.scrape(make, model))

def generatePVInputList(makes, models):
    data =[]
    cars = []
    for make , i in makes:
        temp = {"make" : make,
                "cars" : []}
        for model,  in models:
            if make == make and model not in temp:
                temp["cars"].append({
                    "model" : model,
                    "variants" : []
                }) 
        cars.append(temp)

    return cars
