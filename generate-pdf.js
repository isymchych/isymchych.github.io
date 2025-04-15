#!/usr/bin/env node

const path = require('path');

const puppeteer = require('puppeteer-core');
const which = require('which');

async function run() {
  await generatePdf('CV_Ivan_Symchych.pdf', 'en');
  await generatePdf('Резюме_Іван_Симчич.pdf', 'uk');
}

run().catch((err) => {
  console.error('Failed to generate pdf', err);

  process.exit(1);
});

async function generatePdf(filePath, language) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: await findChrome(),
  });

  const page = await browser.newPage();

  // Override navigator.language and navigator.languages
  await page.evaluateOnNewDocument((language) => {
    Object.defineProperty(navigator, 'language', {
      get: () => language
    });
    Object.defineProperty(navigator, 'languages', {
      get: function () {
        return [language];
      },
    });
  }, language);

  await page.goto('file://' + path.resolve('./index.html'));

  await page.pdf({
    path: filePath,
  });

  console.info(`Generated ${filePath}, language: ${language}`);

  await browser.close();
}

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
