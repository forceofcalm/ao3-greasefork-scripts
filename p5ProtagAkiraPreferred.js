// ==UserScript==
// @name         Akira/Ren Name Switcher for AO3 (site-wide; AKIRA KURUSU PREFERRED)
// @namespace    github.com/forceofcalm
// @version      0.1
// @description  Switches the names Akira Kurusu and Ren Amamiya on AO3 on works tagged as Persona 5.
// @author       calm
// @match        https://archiveofourown.org/works/*
// @icon         [later]
// @grant        none
// @license      MIT
// ==/UserScript==

const names = {
  akira: {
    first: "Akira",
    last: "Kurusu",
    regexFirst: new RegExp(`\bAkira\b`),
    regexFirstLower: new RegExp(`\bakira\b`),
    regexLast: new RegExp(`\bKurusu\b`),
    regexLastLower: new RegExp(`\bkurusu\b`),
  },
  ren: {
    first: "Ren",
    last: "Amamiya",
    regexFirst: new RegExp(`\bRen\b`),
    regexFirstLower: new RegExp(`\bren\b`),
    regexLast: new RegExp(`\bAmamiya\b`),
    regexLastLower: new RegExp(`\bamamiya\b`),
  },
}

const preferredName = names.akira;
const otherName = names.ren;

(() => {
  'use strict';

  if (document.querySelector(".fandom.tags ul.commas").querySelectorAll("li").forEach(tag => tag.textContent !== "Persona 5")) return;

  const workText = document.querySelector('#workskin');

  const preferredFirstName = preferredName.regexFirst.test(workText.textContent) || preferredName.regexFirstLower.test(workText.textContent);
  const otherFirstName = otherName.regexFirst.test(workText.textContent) || otherName.regexFirstLower.test(workText.textContent);
  const preferredLastName = preferredName.regexLast.test(workText.textContent) || preferredName.regexLastLower.test(workText.textContent);
  const otherLastName = otherName.regexLast.test(workText.textContent) || otherName.regexLastLower.test(workText.textContent);


  const hasBothNames = otherFirstName && preferredFirstName || preferredLastName && otherLastName;

  // check that work only has one of the names
  if (hasBothNames) {
    alert('Akira/Ren Name Switcher: Work contains both Akira and Ren. Please edit the work manually.')
    return;
  }

  // work is already in preferred name
  if (preferredFirstName || preferredLastName) {
    return;
  }

  function replaceWord(node, oldWord, newWord) {
    if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = node.textContent.replace(new RegExp(oldWord, 'gi'), newWord);
    } else if (node.hasChildNodes()) {
        node.childNodes.forEach(childNode => {
            replaceWord(childNode, oldWord, newWord);
        });
    }
  }

  // normally cased names
  replaceWord(workText, otherName.first, preferredName.first);
  replaceWord(workText, otherName.last, preferredName.last);

  // lower cased names
  replaceWord(workText, otherName.first.toLowerCase(), preferredName.first.toLowerCase());
  replaceWord(workText, otherName.last.toLowerCase(), preferredName.last.toLowerCase());

  // upper cased names
  replaceWord(workText, otherName.first.toUpperCase(), preferredName.first.toUpperCase());
  replaceWord(workText, otherName.last.toUpperCase(), preferredName.last.toUpperCase());

  console.log('Akira/Ren Name Switcher: Names switched successfully.');
})();