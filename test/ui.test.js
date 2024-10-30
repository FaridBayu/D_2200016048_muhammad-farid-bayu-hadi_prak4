const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function() {
    this.timeout(30000); // Set timeout for Mocha tests
    let driver;

    // Initialize WebDriver before running test cases
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build(); // Can be changed to 'firefox' for Firefox
    });

    // Close WebDriver after all tests are complete
    after(async function() {
        await driver.quit();
    });

    it('should load the login page', async function() {
        await driver.get('file:///D:/kuliah%20sistem%20infor/semester%205/ppmpl%20prak/D_2200016048_Muhammad%20Farid%20Bayu%20Hadi_prak4/login.html'); // Change path to your login.html file
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should input username and password', async function() {
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');
        
        const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');

        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function() {
        await driver.findElement(By.id('loginButton')).click();
    });
    // 1. notif gagal login jika user dan pw salah 
    it('should show error message on failed login', async function() {
        await driver.findElement(By.id('username')).sendKeys('wronguser');
        await driver.findElement(By.id('password')).sendKeys('wrongpassword');
        await driver.findElement(By.id('loginButton')).click();

        const errorMessage = await driver.findElement(By.id('errorMessage')).getText();
        expect(errorMessage).to.equal('Invalid username or password'); // Update the expected message if necessary
        });

        // 2. Use CSS Selector and XPath to locate elements
    it('should find elements using CSS Selector and XPath', async function() {
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');

        const usernameValue = await driver.findElement(By.css('#username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.xpath('//*[@id="password"]')).getAttribute('value');

        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    // 3. Validate that the login button is displayed
    it('should validate login button visibility', async function() {
        const isDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
        expect(isDisplayed).to.be.true;
    });
});;
