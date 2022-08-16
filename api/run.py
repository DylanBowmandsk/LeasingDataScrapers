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
            "modelName": model})
    return jsonify(models)

@app.route("/get/variants")
def getPvVariants():
    variants = []
    for i, modelID, variant in cursor.execute("select UniqueID, ModelID, ModelTrim from [ModelTrimMaster]"):
        if variant != "":
            variants.append({"variantID": i ,"ModelID": modelID,
            "modelTrim": variant})
    return jsonify(variants)

@app.route("/leasingcom/get/makes")
def getLeasingcomBrands():
    return jsonify(leasingScraper.scrapeMakeList())

@app.route("/leasingcom/get/<make>/model")
def getLeasingcomRange(make):
    return jsonify(leasingScraper.scrapeModelList(make))

@app.route("/leasingcom/scrape/<make>/<model>/<variant>")
def scrapeLeasingcom(make,model,variant):
    return jsonify(leasingScraper.scrape(make,model,variant))

@app.route("/leaseloco/scrape/<make>/<model>/<variant>")
def scrapeLeaseLoco(make, model, variant):
    return jsonify(leaseLocoScraper.scrape(make, model, variant))

@app.route("/selectleasing/scrape/<make>/<model>/<variant>")
def scrapeSelectLeasing(make, model, variant):
    return jsonify(selectLeasingScraper.scrape(make, model, variant))

@app.route("/admin/add/<makeID>/<modelID>/<variant>", methods = ['POST'])
def addCar(makeID, modelID, variant):
    cursor.execute(f"INSERT INTO ModelTrimMaster VALUES ('{variant}', '{modelID}')")
    return "posted"

@app.route("/admin/delete/<makeID>/<modelID>/<variant>", methods = ['POST'])
def deleteCar(makeID, modelID, variant):
    cursor.execute(f"DELETE FROM ModelTrimMaster WHERE UniqueID = '{variant}'")
    return "posted"

@app.route("/admin/edit/<makeID>/<modelID>/<variant>/<input>", methods = ['POST'])
def editCar(makeID, modelID, variant, input):
    cursor.execute(f"UPDATE ModelTrimMaster set ModelTrim = '{input}' WHERE UniqueID=CAST({variant} AS INT)")
    return "posted"

