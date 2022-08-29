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
    #options.add_argument("--headless")
    driver = webdriver.Chrome(executable_path=path, options=options)
    driver.set_window_size(1024, 768)
    url = "https://leaseloco.com/car-leasing/search"
    for derivative in derivatives:
        response = requests.get(url)
        if response.status_code == 200:
            driver.get(url)
            Search(driver, derivative)
            sleep(1)
            rows += getElements(driver, derivative, term, initialTerm, mileage)
        elif response.status_code == 403:
            print("forbidden")
        elif response.status_code == 404:
            print("not found")
    return rows

#Enters search terms for make and model
def Search(driver, derivative):
    searchBar = driver.find_element(By.XPATH, "//*[@id='__next']/main/div/div[3]/div[2]/div[1]/div[1]/div/input")
    searchBar.clear()
    searchBar.click()
    searchBar.send_keys(derivative.replace("[", "").replace("]",""))
    sleep(1)
    try:
        element = driver.find_element(By.XPATH, "//*[@id='__next']/main/div/div[3]/div[2]/div[3]/div/div[2]/a[1]/div")
    except NoSuchElementException:
       element = driver.find_element(By.XPATH, '//*[@id="__next"]/main/div/div[3]/div[2]/div[3]/div/div[2]/a[1]/div')
    element.click()
  

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

    name = driver.find_element(By.TAG_NAME, "h1").get_attribute("innerHTML")
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
    return rows

