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
    listLink = driver.find_elements(By.XPATH, "//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a")
    for idx, link in enumerate(listLink):
        name = link.find_element(By.CLASS_NAME, "text-main").get_attribute("innerHTML")
        price = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[4]/p[1]").get_attribute("innerHTML")
        upfront = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[4]/p[2]/mark").get_attribute("innerHTML")
        profile = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[2]/div[2]/div[2]/p[1]/mark").get_attribute("innerHTML")
        mileage = upfront = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[2]/div[2]/div[2]/p[2]/mark").get_attribute("innerHTML")
        print(name, price, upfront, profile, mileage)
        


    
    response = requests.get(url)
    if response.status_code == 200:
        return "api"
    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")


