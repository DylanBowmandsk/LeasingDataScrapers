from flask import Flask, jsonify
from flask_cors import CORS
import leasingScraper
import leaseLocoScraper
import selectLeasingScraper
import json
import urllib.parse
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

@app.route("/get/variants/<model>")
def getPvVariants(model):
    variants = []
    for row in cursor.execute("SELECT Distinct model  FROM [dbo].[LeasingPrices] where model like '" + model + " %'"):
       for x in row:
             variants.append(x[len(model)+ 1:])
    return jsonify(variants)

@app.route("/get/derivatives/<model>/<variant>")
def getPvDerivatives(model ,variant):
    derivatives = []
    for row in cursor.execute("SELECT Distinct derivative  FROM [dbo].[LeasingPrices] where model like '" + model +" " + variant +"'"):
        for x in row:
                derivatives.append(x)
    return jsonify(derivatives)

@app.route("/pv/scrape/<derivative>/<term>/<initialTerm>/<mileage>")
def getPvPrice(derivative,term,initialTerm,mileage):
    lowest = 0
    cars =[]
    derivative = derivative.replace("+","/")
    for derivative, price in cursor.execute(f"SELECT [derivative], [monthly_rental] FROM [dbo].[LeasingPrices] where derivative = '{derivative}' and term = {term} and mileage = {mileage} and initial_profile = {initialTerm} and type = 'Personal'"):
        if(lowest == 0 or lowest > price): lowest = price
        cars.append({"price": lowest,
        "derivative": derivative})
    return jsonify(cars)  
    
@app.route("/pv/scrape/<model>/<variant>/all/<term>/<initialTerm>/<mileage>")
def getAllPvPrice(model, variant,term,initialTerm,mileage):
    lowest = 0
    derivatives = []
    data = json.loads(getPvDerivatives(model, variant).data)
    for derivative in data:
        derivatives.append(derivative)
    derivative = derivative.replace("+","/")
    for derivative, price in cursor.execute(f"SELECT [derivative], [monthly_rental] FROM [dbo].[LeasingPrices] where derivative = '{derivative}' and term = {term} and mileage = {mileage} and initial_profile = {initialTerm} and type = 'Personal'"):
        if(lowest == 0 or lowest > price): lowest = price
        derivatives.append({"price": lowest,
        "derivative": derivative})
    return jsonify(derivatives)  
  
     
@app.route("/leasingcom/get/make")
def getLeasingcomMakes():
    return jsonify(leasingScraper.scrapeMakeList())

@app.route("/leasingcom/get/<make>/models")
def getLeasingcomModels(make):
    return jsonify(leasingScraper.scrapeModelList(make))
    
@app.route("/leasingcom/get/<make>/<model>/variants")
def getLeasingcomVariants(make, model):
    return jsonify(leasingScraper.scrapeVariantList(make, model))

@app.route("/leasingcom/get/<make>/<model>/<variant>/derivative")
def getLeasingcomDerivatives(make,model,variant):
    return jsonify(leasingScraper.scrapeDerivativeList(make,model,variant))

@app.route("/leasingcom/scrape/<make>/<model>/<variant>/<derivative>/<term>/<initialTerm>/<mileage>")
def scrapeLeasingcom(make,model,variant,derivative,term,initialTerm,mileage):
        return jsonify(leasingScraper.scrape(make,model,variant,derivative,term,initialTerm,mileage))

@app.route("/leasingcom/scrape/<make>/<model>/<variant>/all/<term>/<initialTerm>/<mileage>")
def scrapeAllLeasingcom(make,model,variant,term,initialTerm,mileage):
    derivatives = []
    data = json.loads(getPvDerivatives(model, variant).data)
    for derivative in data:
        derivatives.append(derivative)
    return jsonify(leasingScraper.scrapeAll(make,model,variant, derivatives, term, initialTerm, mileage))

@app.route("/leaseloco/scrape/<make>/<model>/<variant>/<derivative>/<term>/<initialTerm>/<mileage>")
def scrapeLeaseLoco(make,model,variant,derivative,term,initialTerm,mileage):
    return jsonify(leaseLocoScraper.scrape(make,model,variant,derivative,term,initialTerm,mileage))

@app.route("/leaseloco/scrape/<make>/<model>/<variant>/all/<term>/<initialTerm>/<mileage>")
def scrapeAllLeaseLoco(make,model,variant,term,initialTerm,mileage):
    derivatives = []
    data = json.loads(getPvDerivatives(model, variant).data)
    for derivative in data:
        derivatives.append(derivative)
    return jsonify(leaseLocoScraper.scrapeAll(make,model,variant, derivatives,term,initialTerm,mileage))

@app.route("/selectleasing/scrape/<make>/<model>/<variant>/<derivative>/<term>/<initialTerm>/<mileage>")
def scrapeSelectLeasing(make, model, variant,derivative,term,initialTerm,mileage):
    return jsonify(selectLeasingScraper.scrape(make, model, variant, derivative, term,initialTerm, mileage))

@app.route("/selectleasing/scrape/<make>/<model>/<variant>/all/<term>/<initialTerm>/<mileage>")
def scrapeAllSelectLeasing(make,model,variant,term,initialTerm,mileage):
    derivatives = []
    data = json.loads(getPvDerivatives(model, variant).data)
    for derivative in data:
        derivatives.append(derivative)
    return jsonify(selectLeasingScraper.scrapeAll(make, model,variant, derivatives, term, initialTerm, mileage))

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

