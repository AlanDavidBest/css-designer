const parseString = require("xml2js").parseString;
const axios = require("axios");
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch'); var async = require("async");
const puppeteer = require('puppeteer-extra')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')

// Add adblocker plugin, which will transparently block ads in all pages you create using puppeteer.
puppeteer.use(AdblockerPlugin())
const SCREEN_SHOT_DIR = "./screenshot/"

async function compareSite() {
    let pages = await getPages()
    console.log("Total Pages on site " + pages.length)
    let index = 1
    async.mapLimit(pages, 1, async function (page) {
        let prodFileName = SCREEN_SHOT_DIR + index + "-prod.png"
        let preFileName = SCREEN_SHOT_DIR + index + "-pre.png"
        let prodUrl = "http://www.travelsupermarket.com" + page + "?source=TIV"
        let preUrl = "http://www.pre1.gb.travelsupermarket.com" + page + "?source=TIV"
        await capture(prodUrl, prodFileName)
        await capture(preUrl, preFileName)
        let comparison = getComparisonResult(index)

        if (comparison.percentMatch !== 100) {
            let errorFileBaseName = page.replace(/\//g, "_");
            fs.copyFile(prodFileName, "./screenshot/fails/" + errorFileBaseName + "-prod.png", (err => {
                if(err) {
                    console.log("ERROR: Failed to copy prod file: " + page + " - " + err)
                }
            }))
            fs.copyFile(preFileName, "./screenshot/fails/" + errorFileBaseName + "-pre.png", (err => {
                if(err) {
                    console.log("ERROR: Failed to copy pre file: " + page + " - " + err)
                }
            }))
            fs.writeFile("./screenshot/fails/" + errorFileBaseName + "-diff.png", PNG.sync.write(comparison.differenceImageData), (err) => {
                if (err) {
                    console.log("ERROR: Failed to write diff file: " + page + " - " + err)
                }
            })
        } else {
            // remove screenshots
        }
        console.log("Page: " + prodUrl)
        index++
    })
}

async function capture(url, imageName) {
    try {
        const browser = await puppeteer.launch();
        const puppetPage = await browser.newPage();
        await puppetPage.goto(url);
        await puppetPage.screenshot({ path: imageName, fullPage: true });
        await browser.close();
    } catch (err) {
        console.log("ERROR: Error capturing page " + url + " error: " + err)
    }
};

async function getPages() {
    const siteMapRequests = [];
    await axios.get('https://www.travelsupermarket.com/sitemapindex.xml').then(response => {
        parseString(response.data, (err, result) => {
            if (err) {
                console.log(response.data);
                console.log("ERROR: Failed to parse sitemapindex.xml " + err);
            } else {
                result.sitemapindex.sitemap.forEach(location => {
                    location.loc.forEach(url => {
                        siteMapRequests.push(axios.default.get(url));
                    })

                });
            }
        });
    });
    const responses = await Promise.all(siteMapRequests);
    const pageList = responses.map(resp =>
        resp.data.match(/https:\/\/www\.travelsupermarket\.com\/([a-z0-9/-]+)/g).map(
            match => match.replace(`https://www.travelsupermarket.com/`, "/")));
    let pages = pageList.flat().sort()
    return pages;
}

function getComparisonResult(snapshotNo) {
    let percentMatch
    let diff
    let difference
    try {
        const img1 = PNG.sync.read(fs.readFileSync(SCREEN_SHOT_DIR + snapshotNo + '-prod.png'));
        const img2 = PNG.sync.read(fs.readFileSync(SCREEN_SHOT_DIR + snapshotNo + '-pre.png'));
        const { width, height } = img1;
        diff = new PNG({ width, height });
        difference = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
        percentMatch = 100 - difference * 100 / (width * height);
        console.log(`Image: ${snapshotNo} Percent Match: ${percentMatch}%   ${difference} pixels Different: `);
    } catch (err) {
        console.log("Err: " + err)
        return {
            percentMatch: 0,
            differenceImageData: diff,
            noDifferentPixels: difference,
            errorMessage: err
        }
    }
    return {
        percentMatch: percentMatch,
        differenceImageData: diff
    }
}

compareSite();
