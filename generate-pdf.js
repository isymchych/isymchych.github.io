#!/usr/bin/env node

const path = require('path');

const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto('file://' + path.resolve('./index.html'));

  await page.pdf({
    path: 'CV_Ivan_Symchych.pdf',
  });

  await browser.close();
}

run().catch((err) => {
  console.error('Failed to generate pdf', err);

  process.exit(1);
});
