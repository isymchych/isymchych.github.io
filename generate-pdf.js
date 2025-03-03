#!/usr/bin/env node

const path = require('path');

const puppeteer = require('puppeteer-core');
const which = require('which');

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: await findChrome(),
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


async function findChrome() {
  const chrome = await which('google-chrome-stable', { nothrow: true });

  if (chrome) {
    return chrome;
  }

  const chromium = await which('chromium', { nothrow: true });

  if (chromium) {
    return chromium;
  }

  throw new Error("Couldn't find neither Chrome nor Chromium");
}
