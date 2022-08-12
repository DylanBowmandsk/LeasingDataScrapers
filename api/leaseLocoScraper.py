from time import sleep
import requests 
#Selenium virtual brwoser for scraping web pages
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException 


# global scrape function for lease loco
def scrape(make, model, variant):
    url = "https://leaseloco.com/car-leasing/search"
    driver = setupDriver(url)
    rows = getElements(driver, make, model, variant)
    response = requests.get(url)
    if response.status_code == 200:
        return rows
    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")

#creates base web crawler for interacting with the DOM
def setupDriver(url):
    path = "./venv/chromedriver.exe"
    options = Options()
    options.headless = True
    driver = webdriver.Chrome(executable_path=path, options=options)
    driver.get(url)
    driver.set_window_size(1024, 768)
    return driver

#Enters search terms for make and model
def setMakeModel(driver, make, model, variant):
    searchBar = driver.find_element(By.XPATH, "//*[@id='__next']/main/div/div[3]/div[2]/div[1]/div[1]/div/input")
    searchBar.click()
    searchBar.send_keys(make + " " + model + " " + variant)
    sleep(1)

#Scrapes data for processing to end point output
def getElements(driver, make, model, variant):
    setMakeModel(driver, make, model, variant)
    rows = []
    listLink = driver.find_elements(By.XPATH, "//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a")

    #Tries both configurations for search cards
    for idx, link in enumerate(listLink):
        try:
            name = link.find_element(By.CLASS_NAME, "text-main").get_attribute("innerHTML")
            derivative = link.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[3]/div[2]/div[3]/div/div[2]/a[{idx+1}]/div/div[2]/div[1]/p").get_attribute("innerHTML")
            price = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[3]/div[2]/div[3]/div/div[2]/a[{idx+1}]/div/div[4]/p[1]").get_attribute("innerHTML")
            upfront = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[4]/p[2]/mark").get_attribute("innerHTML")
            profile = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[2]/div[2]/div[2]/p[1]/mark").get_attribute("innerHTML").split("+")
            initialTerm = profile[0]+" Months"
            term = profile[1]+" Months"
            mileage = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[2]/div[2]/div[2]/p[2]/mark").get_attribute("innerHTML").replace("k", "000") + " p/a"
            totalLease = int(int(profile[1]) * float(price.replace("£","")))

            rows.append(createRow(name, price, mileage, upfront, totalLease, term, initialTerm, derivative))

        except NoSuchElementException:
            name = link.find_element(By.CLASS_NAME, "text-main").get_attribute("innerHTML")
            derivative = link.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[3]/div[2]/div[3]/div/div[2]/a[{idx+1}]/div/div[3]/div[1]/p").get_attribute("innerHTML")
            price = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[3]/div[2]/div[3]/div/div[2]/a[{idx+1}]/div/div[5]/p[1]").get_attribute("innerHTML")
            upfront = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[5]/p[2]/mark").get_attribute("innerHTML")
            profile = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[3]/div[2]/div[2]/p[1]/mark").get_attribute("innerHTML").split("+")
            initialTerm = profile[0]+" Months"
            term = profile[1]+" Months"
            mileage = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[3]/div[2]/div[2]/p[2]/mark").get_attribute("innerHTML").replace("k", "000") + " p/a"
            totalLease = int(int(profile[1]) * float(price.replace("£","")))

            rows.append(createRow(name, price, mileage, upfront, totalLease, term, initialTerm, derivative))

    return rows

def createRow(name, price, mileage, upfront, totalLease, term, initialTerm, derivative):
    return  {"name": name,
            "price" : price+" p/m",
            "mileage" : mileage,
            "upfrontCost": upfront,
            "totalLease" : "£"+str(totalLease),
            "term" : term,
            "initialTerm" : initialTerm,
            "derivative" : derivative}