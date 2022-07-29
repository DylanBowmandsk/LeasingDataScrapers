from time import sleep, time
import requests 
#Imports the beautiful soup library for scraping
from bs4 import BeautifulSoup
from selenium import webdriver



def scrape():
    path = "./venv/chromedriver.exe"
    driver = webdriver.Chrome(path)
    url = "https://leaseloco.com/car-leasing/search"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content,"html.parser")
        contentWrapper = soup.find("div", class_="row main m-0")
        containerSearchResults = contentWrapper.find("div", class_="row p-0 m-0 mb-5")
        div = containerSearchResults.find("div")
        driver.get("http://google.com")
        return "t"
    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")