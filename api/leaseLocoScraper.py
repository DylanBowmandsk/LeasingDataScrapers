from re import search
from time import sleep
import requests 
#Selenium virtual brwoser for scraping web pages
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException 
from selenium.webdriver.support.ui import Select


# global scrape function for lease loco
def scrape(make,model,variant, derivative, term, initialTerm, mileage):
    rows = []
    path = "./venv/chromedriver.exe"
    options = Options()
    options.headless = True
    options.add_argument("--incognito")
    options.add_argument(f'user-agent={"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.56 Safari/537.36"}')
    driver = webdriver.Chrome(executable_path=path, options=options)
    baseUrl = "https://leaseloco.com/car-leasing/search"

    driver.get(baseUrl)
    Search(driver, derivative)
    try:
        element = driver.find_element(By.CLASS_NAME, "link--result-row")        
        url = element.get_attribute("href").split("/") 
        urlArray = url
        filters = urlArray[8].split("-")  
        filters[0] = "2"
        filters[1] = term
        filters [2] = mileage
        filters[3] = initialTerm
        urlArray[8] = "-".join(filters)
        url = "/".join(urlArray)
        driver.get(url)
        print(url)
        sleep(1)
        rows += getElements(driver, derivative, term, initialTerm, mileage)
        response = requests.get(url)
        if response.status_code == 403:
            print("forbidden")
        elif response.status_code == 404:
            print("not found")
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

def scrapeAllDerivatives(make, model, derivatives, term, initialTerm, mileage):
    rows = []
    path = "./venv/chromedriver.exe"
    options = Options()
    options.headless = True
    options.add_argument("--incognito")
    options.add_argument(f'user-agent={"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.56 Safari/537.36"}')
    driver = webdriver.Chrome(executable_path=path, options=options)
    baseUrl = "https://leaseloco.com/car-leasing/search"
    for car in derivatives:
        driver.get(baseUrl)
        sleep(1)
        Search(driver, car)
        try:
            element = driver.find_element(By.CLASS_NAME, "link--result-row")        
            url = element.get_attribute("href").split("/") 
            urlArray = url
            filters = urlArray[8].split("-")  
            filters[0] = "2"
            filters[1] = term
            filters [2] = mileage
            filters[3] = initialTerm
            urlArray[8] = "-".join(filters)
            url = "/".join(urlArray)
            driver.get(url)
            print(url)
            sleep(1)
            rows += getElements(driver, car, term, initialTerm, mileage)
            response = requests.get(url)
            if response.status_code == 403:
                print("forbidden")
            elif response.status_code == 404:
                print("not found")
        except:
            rows.append({"name": make+ " " + model,
            "price" : "No Data",
            "mileage" : "No Data",
            "upfrontCost": "No Data",
            "additionalFees": "No Data",
            "totalLease" : "No Data",
            "term" : "No Data",
            "initialTerm" : "No Data",
            "derivative" : car})

    return rows
#Enters search terms for make and model
def Search(driver, derivative):
    sleep(1)
    searchBar = driver.find_element(By.CLASS_NAME, "search--input")
    searchBar.click()
    searchBar.clear()
    searchBar.send_keys(derivative.replace("[", "").replace("]",""))
    sleep(1)

def getElements(driver, derivative, term, initialTerm, mileage):
    rows = []

    nameContainer = driver.find_element(By.CLASS_NAME, "price-page__vehicle-make-model")
    name = nameContainer.find_element(By.TAG_NAME, "h1").get_attribute("innerHTML")
    priceContainer = driver.find_element(By.CLASS_NAME, 'price-page__price')
    price = priceContainer.find_element(By.TAG_NAME, "h2").get_attribute("innerHTML")
    upfront  = priceContainer.find_element(By.CLASS_NAME, "mt-3").get_attribute("innerHTML")

    rows.append({"name": name,
            "price" : price,
            "mileage" : mileage,
            "upfrontCost": upfront,
            "totalLease" : "£"+str("totalLease"),
            "term" : term,
            "initialTerm" : initialTerm,
            "derivative" : derivative})

    return rows

