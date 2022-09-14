import requests 
#Imports the beautiful soup library for scraping
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

def scrape(make,model,variant,derivative,term,initialTerm,mileage):
    derivative = derivative.replace("[", "")
    derivative = derivative.replace("]", "")
    derivative = derivative.replace(" ", "-")
    derivative = derivative.replace("/", "")
    print(make)
    if  make == "HONDA" or make == "ABARTH":
        derivative = derivative.replace(".", "")
    else:
        derivative = derivative.replace(".", "-")
    derivativeOG = derivative
    url = (f"https://www.selectcarleasing.co.uk/car-leasing/{make}/{model.replace(' ', '-')}/{variant.replace(' ', '-')}/{derivative}?".lower())
    if term :
        url += f"term={term}&"
    if initialTerm :
        url += f"initial_payment={initialTerm}&"
    if mileage :
        url += f"mileage={mileage}&"
    print(url)
    response = requests.get(url)
    
    if response.status_code == 200:
        path = "./venv/chromedriver.exe"
        options = Options()
        options.headless = True
        driver = webdriver.Chrome(executable_path=path, options=options)
        driver.get(url)
        html = driver.page_source
        print(url)
        soup = BeautifulSoup(html, "html.parser")
        return collateData(soup, make, model, derivativeOG, term, initialTerm, mileage)
    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")

def scrapeAllDerivatives(make,model,variant,derivatives,term,initialTerm,mileage):
    if variant == "595C CONVERTIBLE" or variant == "695C CONVERTIBLE":
        variant = variant[len(model) + 2:]
    else:
        variant = variant[len(model) + 1:]

    options = Options()
    options.headless = True
    path = "./venv/chromedriver.exe"
    driver = webdriver.Chrome(executable_path=path, options=options)
    driver.set_window_size(1024, 768)
        
    rows = []
    for derivative in derivatives:
        time.sleep(0.8)
        derivativeOG = derivative
        derivativeURI = derivative.replace("[", "").replace("]", "").replace(" ", "-").replace("/", "").replace("+", "-plus-")
        if  make == "HONDA" or make == "ABARTH":
            derivativeURI = derivativeURI.replace(".", "")
        else:
            derivativeURI = derivativeURI.replace(".", "-")
        url = (f"https://www.selectcarleasing.co.uk/car-leasing/{make}/{model.replace(' ', '-')}/{variant.replace(' ', '-')}/{derivativeURI}?".lower())
        if term :
            url += f"term={term}&"
        if initialTerm :
            url += f"initial_payment={initialTerm}&"
        if mileage :
            url += f"mileage={mileage}&"
        print(url)
        response = requests.get(url)
        if response.status_code == 200:
            driver.get(url)
            html = driver.page_source
            soup = BeautifulSoup(html, "html.parser")
            rows += collateData(soup, make, model, derivativeOG, term, initialTerm, mileage)
        elif response.status_code == 403:
            print("forbidden")
        elif response.status_code == 404:
            print("not found")
    return rows

def collateData(soup, make, model, derivative, term, initialTerm, mileage):
    try:
        rows = []
        priceContainer = soup.find("div","monthly-price")
        price = priceContainer.find("span").text
        upfrontCostContainer = soup.find("div", "g-deal-options__upfront")
        upfrontCost = upfrontCostContainer.find("span").text
        additionalFees = soup.find("span", "c-list-table__data").text

        rows.append({"name": make+ " " + model,
            "price" : price+"p/m",
            "mileage" : mileage,
            "upfrontCost": upfrontCost,
            "additionalFees": additionalFees,
            "totalLease" : "totalLease",
            "term" : term + "Months",
            "initialTerm" : initialTerm,
            "derivative" : derivative})
    except:
        rows.append({"name": make+ " " + model,
            "price" : "No Data",
            "mileage" : "No Data",
            "upfrontCost": "No Data",
            "additionalFees": "No Data",
            "totalLease" : "No Data",
            "term" : "No Data",
            "initialTerm" : "No Data",
            "derivative" : derivative})
    return rows


