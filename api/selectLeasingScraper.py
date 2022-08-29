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
    derivative = derivative.replace(".", "-")
    url = (f"https://selectcarleasing.co.uk/car-leasing/{make}/{model.replace(' ', '-')}/{variant.replace(' ', '-')}/{derivative}?".lower())
    if term :
        url += f"term={term}&"
    if initialTerm :
        url += f"upfront={initialTerm}&"
    if mileage :
        url += f"mileage={mileage}&"
    response = requests.get(url)
    
    if response.status_code == 200:
        path = "./venv/chromedriver.exe"
        options = Options()
        #options.headless = True
        driver = webdriver.Chrome(executable_path=path, options=options)
        driver.get(url)
        html = driver.page_source
        print(url)
        soup = BeautifulSoup(html, "html.parser")
        return collateData(soup, make, model, term, initialTerm, mileage)
    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")

def scrapeAll(make,model,variant,derivatives,term,initialTerm,mileage):
    options = Options()
    #options.headless = True
    path = "./venv/chromedriver.exe"
    driver = webdriver.Chrome(executable_path=path, options=options)
    driver.set_window_size(1024, 768)
        
    rows = []
    for derivative in derivatives:
        time.sleep(0.8)
        derivative = derivative.replace("[", "")
        derivative = derivative.replace("]", "")
        derivative = derivative.replace(" ", "-")
        derivative = derivative.replace("/", "")
        derivative = derivative.replace(".", "-")
        url = (f"https://selectcarleasing.co.uk/car-leasing/{make}/{model.replace(' ', '-')}/{variant.replace(' ', '-')}/{derivative}?".lower())
        if term :
            url += f"term={term}&"
        if initialTerm :
            url += f"upfront={initialTerm}&"
        if mileage :
            url += f"mileage={mileage}&"
        response = requests.get(url)
        
        if response.status_code == 200:
            driver.get(url)
            html = driver.page_source
            soup = BeautifulSoup(html, "html.parser")
            rows += collateData(soup, make, model, term, initialTerm, mileage)
        elif response.status_code == 403:
            print("forbidden")
        elif response.status_code == 404:
            print("not found")
    return rows

def collateData(soup, make, model, term, initialTerm, mileage):
    rows = []
    priceContainer = soup.find("div","monthly-price")
    price = priceContainer.find("span").text
    upfrontCostContainer = soup.find("div", "g-deal-options__upfront")
    upfrontCost = upfrontCostContainer.find("span").text
    additionalFees = soup.find("span", "c-list-table__data").text
    derivative = soup.find("div", "c-title-block__inline").text


    rows.append({"name": make+ " " + model,
        "price" : price+"p/m",
        "mileage" : mileage,
        "upfrontCost": upfrontCost,
        "additionalFees": additionalFees,
        "totalLease" : "totalLease",
        "term" : term + "Months",
        "initialTerm" : initialTerm,
        "derivative" : derivative[0: -9]})
    return rows


