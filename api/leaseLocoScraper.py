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
    path = "./venv/chromedriver.exe"
    options = Options()
    driver = webdriver.Chrome(executable_path=path, options=options)
    url = "https://leaseloco.com/car-leasing/search"
    driver.get(url)
    Search(driver, derivative)
    sleep(1)
    rows = getElements(driver, derivative, term, initialTerm, mileage)
    response = requests.get(url)
    if response.status_code == 200:
        return rows
    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")

def scrapeAll(make, model, variant, derivatives, term, initialTerm, mileage):
    rows = []
    path = "./venv/chromedriver.exe"
    options = Options()
    driver = webdriver.Chrome(executable_path=path, options=options)
    baseUrl = "https://leaseloco.com/car-leasing/search"
    for car in derivatives:
        driver.get(baseUrl)
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
        except:
            print("no element")
        if response.status_code == 403:
            print("forbidden")
        elif response.status_code == 404:
            print("not found")
 
    return rows
#Enters search terms for make and model
def Search(driver, derivative):
    sleep(1)
    searchBar = driver.find_element(By.CLASS_NAME, "search--input")
    searchBar.click()
    searchBar.clear()
    searchBar.send_keys(derivative.replace("[", "").replace("]",""))
    sleep(1)
    
  

def refine(driver, term, initialTerm, mileage):
    initialTermButton = driver.find_element(By.CLASS_NAME, "lease-profile__initial-payment-in-months--"+initialTerm)
    initialTermButton.click()
    sleep(1)
    termButton = driver.find_element(By.CLASS_NAME, "lease-profile__term--"+term)
    termButton.click()
    sleep(1)
    mileageDropdown = Select(driver.find_element(By.ID, "mileage"))
    element = mileageDropdown.select_by_value(mileage)
    sleep(1)


def getElements(driver, derivative, term, initialTerm, mileage):
    rows = []

    nameContainer = driver.find_element(By.CLASS_NAME, "price-page__vehicle-make-model")
    name = nameContainer.find_element(By.TAG_NAME, "h1").get_attribute("innerHTML")
    priceContainer = driver.find_element(By.CLASS_NAME, 'price-page__price')
    price = priceContainer.find_element(By.TAG_NAME, "h2").get_attribute("innerHTML")


    rows.append({"name": name,
            "price" : price+" p/m",
            "mileage" : mileage,
            "upfrontCost": "upfront",
            "totalLease" : "£"+str("totalLease"),
            "term" : term,
            "initialTerm" : initialTerm,
            "derivative" : derivative})

    print(rows)
    return rows

