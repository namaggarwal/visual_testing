const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot');

const baseURL = "https://developer.grab.com"

expect.extend({ toMatchImageSnapshot });

describe('Developer portal', function() {
  
  // To start with clean slate ppen a new browser and a new tab for each test
  beforeEach(async () => {
    browser = await puppeteer.launch({headless: false})
    page = await browser.newPage()
  })

  // Close the browser after each test
  afterEach(async () => {
    return browser.close()
  })

  // Let's test on 1640x800
  describe('on Browser 1640x800', () => {
    beforeEach(async () => {
      //Set view port to the correct size
      return page.setViewport({width: 1640, height: 800})
    })

    describe('Home page', () => {
      it('should render correctly', async function() {
        // Goto the home page, wait until no more than 2 network connections are idle
        await page.goto(baseURL, {waitUntil: 'networkidle2'})
        //Take the full page screenshot
        const image = await page.screenshot({fullPage: true})
        //Compare the image, we have set threshold to 1 to make it less sensitive
        expect(image).toMatchImageSnapshot({ threshold: 1 });
      })
    })

    describe('Product page', () => {
      it('should render correctly', async function() {
        await page.goto(baseURL+'/products', {waitUntil: 'networkidle2'})
        const image = await page.screenshot({fullPage: true})
        expect(image).toMatchImageSnapshot({ threshold: 1 });
      })
    })
  })

  describe('on Browser 440x800', () => {
    beforeEach(async () => {
      return page.setViewport({width: 440, height: 800})
    })

    describe('Home page', () => {
      it('should render correctly', async function() {
        await page.goto(baseURL, {waitUntil: 'networkidle2'})
        const image = await page.screenshot({fullPage: true})
        expect(image).toMatchImageSnapshot({ threshold: 1 });
      })
    })

    describe('Product page', () => {
      it('should render correctly', async function() {
        await page.goto(baseURL+'/products', {waitUntil: 'networkidle2'})
        const image = await page.screenshot({fullPage: true})
        expect(image).toMatchImageSnapshot({ threshold: 1 });
      })
    })
  })
});