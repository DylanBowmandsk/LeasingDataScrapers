from time import sleep, time
import requests 
#Imports the beautiful soup library for scraping
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.by import By



def scrape():
    url = "https://leaseloco.com/car-leasing/search"
    path = "./venv/chromedriver.exe"
    options = Options()
    options.headless = True
    driver = webdriver.Chrome(executable_path=path, options=options)
    driver.get(url)
    waitTimer = WebDriverWait(driver, 1).until(
    ec.presence_of_element_located((By.CLASS_NAME, "link--result-row")))
    listLink = driver.find_elements(By.CLASS_NAME, "link--result-row")

    for link in listLink:
        name = link.find_element(By.CLASS_NAME, "text-main")
        print(name.get_attribute("innerHTML"))
    
    response = requests.get(url)
    if response.status_code == 200:
        return "api"
    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")