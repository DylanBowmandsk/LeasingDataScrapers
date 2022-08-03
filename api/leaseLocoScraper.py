import requests 
#Imports the beautiful soup library for scraping
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException 


# global scrape function for lease loco
def scrape():
    url = "https://leaseloco.com/car-leasing/search"
    path = "./venv/chromedriver.exe"
    options = Options()
    options.headless = True
    driver = webdriver.Chrome(executable_path=path, options=options)
    driver.get(url)
    driver.set_window_size(1024, 768)

    #waits for the page to load until list item appears
    waitTimer = WebDriverWait(driver, 0.5).until(ec.presence_of_element_located((By.CLASS_NAME, "link--result-row")))

    rows = getElements(driver)

    print(rows)
        
    response = requests.get(url)
    if response.status_code == 200:
        return "api"
    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")

def getElements(driver):
    listLink = driver.find_elements(By.XPATH, "//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a")
    rows = []
    for idx, link in enumerate(listLink):
        try:
            name = link.find_element(By.CLASS_NAME, "text-main").get_attribute("innerHTML")
            price = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[3]/div[2]/div[3]/div/div[2]/a[{idx+1}]/div/div[4]/p[1]").get_attribute("innerHTML")+"p/m"
            upfront = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[4]/p[2]/mark").get_attribute("innerHTML")
            profile = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[2]/div[2]/div[2]/p[1]/mark").get_attribute("innerHTML").split("+")
            initialTerm = profile[0]+" Months"
            term = profile[1]
            mileage = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[2]/div[2]/div[2]/p[2]/mark").get_attribute("innerHTML").replace("k", "000") + " p/a"
            rows.append([name,price,upfront,initialTerm,term,mileage])
        except NoSuchElementException:
            name = link.find_element(By.CLASS_NAME, "text-main").get_attribute("innerHTML")
            price = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[3]/div[2]/div[3]/div/div[2]/a[{idx+1}]/div/div[5]/p[1]").get_attribute("innerHTML")
            upfront = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[5]/p[2]/mark").get_attribute("innerHTML")
            profile = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[3]/div[2]/div[2]/p[1]/mark").get_attribute("innerHTML").split("+")
            initialTerm = profile[0]
            term = profile[1]
            mileage = driver.find_element(By.XPATH, f"//*[@id='__next']/main/div/div[2]/div[3]/div[3]/div/div[2]/a[{idx+1}]/div/div[3]/div[2]/div[2]/p[2]/mark").get_attribute("innerHTML")
            rows.append([name,price,upfront,initialTerm,term,mileage])
    return rows