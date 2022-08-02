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
    waitTimer = WebDriverWait(driver, 3).until(
    ec.presence_of_element_located((By.CLASS_NAME, "css-1gzxeik")))
    listLink = driver.find_element(By.CLASS_NAME, "link--result-row")
    print(listLink.get_attribute("innerHTML"))
    
    response = requests.get(url)
    if response.status_code == 200:
        return "api"
    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")