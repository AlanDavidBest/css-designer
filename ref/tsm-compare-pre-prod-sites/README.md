# TSM Pre vs Prod Whole Site Comparison

## Overview
This utility validates every page in prod against its version in pre. It uses the sitemapindex.xml in prod to identify all pages to be validated.

For each page it uses 'puppeteer' and 'puppeteer-extra' to open the page without ads and does a full page image capture to PNG; it does this with both the prod and pre page.

It then uses 'pixelmatch' to compare the two images. If there are any differences it will copy the screenshots of pre and prod into a 'fails' directory along with a PNG that highlights the differences on the pages.

## Setup
npm install

## Run
node ./compareSite.js


