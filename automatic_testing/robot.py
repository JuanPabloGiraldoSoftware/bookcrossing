from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = Chrome("./chromedriver.exe")
driver.get("https://bookcrossingpuj.netlify.app/")

print(driver.current_url)


def automatic_login(usr,pwd):
    element_pointer = driver.find_element(by=By.ID, value="loginButton")
    element_pointer.click()
    element_pointer = driver.find_element(by=By.ID, value="userFieldL")
    element_pointer.send_keys(usr)
    element_pointer = driver.find_element(by=By.ID, value="passwordFieldL")
    element_pointer.send_keys(pwd)
    element_pointer = driver.find_element(by=By.ID, value="authLogin")
    element_pointer.click()

def close_session():
    element_pointer = driver.find_element(by=By.ID, value="logoutButton")
    element_pointer.click()
    
def automatic_test_signup(usr,pwd,email,cel):
    element_pointer = driver.find_element(by=By.ID, value="signupButton")
    element_pointer.click()
    element_pointer = driver.find_element(by=By.ID, value="userFieldS")
    element_pointer.send_keys(usr)
    element_pointer = driver.find_element(by=By.ID, value="passwordFieldS")
    element_pointer.send_keys(pwd)
    element_pointer = driver.find_element(by=By.ID, value="mailField")
    element_pointer.send_keys(email)
    element_pointer = driver.find_element(by=By.ID, value="celField")
    element_pointer.send_keys(cel)
    element_pointer = driver.find_element(by=By.ID, value="regButton")
    element_pointer.click()

def automatic_test_books_addition(title, author, language, gender, year):
    automatic_login("natalia1","natalia1*")
    element_pointer = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "addingS")))
    element_pointer.click()
    element_pointer = driver.find_element(by=By.ID, value="bookTitleField")
    element_pointer.send_keys(title)
    element_pointer = driver.find_element(by=By.ID, value="bookAuthorField")
    element_pointer.send_keys(author)
    element_pointer = driver.find_element(by=By.ID, value="bookLanguage")
    element_pointer.send_keys(language)
    element_pointer = driver.find_element(by=By.ID, value="bookGender")
    element_pointer.send_keys(gender)
    element_pointer = driver.find_element(by=By.ID, value="bookYear")
    element_pointer.send_keys(year)
    element_pointer = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "addBookB")))
    element_pointer.click()

automatic_test_books_addition("automaticBook1","autoAuthor1","autoLeng1","autoGender1","1984")
close_session()
automatic_test_signup("autoUser", "autoPass", "auto@javerianacali.edu.co", "1234567891")