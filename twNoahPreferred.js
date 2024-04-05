// ==UserScript==
// @name         John/Noah Name Switcher for AO3 (site-wide; NOAH PREFERRED)
// @namespace    github.com/forceofcalm
// @version      0.1
// @description  Switches the name John to Noah on AO3 on works tagged as Teen Wolf.
// @author       calm
// @match        https://archiveofourown.org/works/*
// @icon         [later]
// @grant        none
// @license      MIT
// ==/UserScript==

const names = {
  john: {
    name: 'John',
    regex: new RegExp(String.raw`\bJohn\b`, 'gu'),
    regexLower: new RegExp(String.raw`\bjohn\b`, 'gu'),
    regextUpper: new RegExp(String.raw`\bJOHN\b`, 'gu'),
    regexIgnoreCase: new RegExp(String.raw`\bJohn\b`, 'gui'),
  },
  noah: {
    name: 'Noah',
    regex: new RegExp(String.raw`\bNoah\b`, 'gu'),
    regexLower: new RegExp(String.raw`\bnoah\b`, 'gu'),
    regexUpper: new RegExp(String.raw`\bNOAH\b`, 'gu'),
    regexIgnoreCase: new RegExp(String.raw`\bNoah\b`, 'gui'),
  },
}

const preferredName = names.noah;
const otherName = names.john;

(() => {
  'use strict';

  if (!document.querySelector(".fandom.tags ul.commas").querySelectorAll("li").some(tag => tag.textContent === "Teen Wolf")) return;

  const workText = document.querySelector('#workskin');

  const preferredName = preferredName.regexIgnoreCase.test(workText.textContent);
  const otherName = otherName.regexIgnoreCase.test(workText.textContent);

  const hasBothNames = preferredName && otherName;

  // check that work only has one of the names
  if (hasBothNames) {
    alert('John/Noah Name Switcher: Work contains both John and Noah. Please edit the work manually.')
    return;
  }

  // work is already in preferred name
  if (preferredName) {
    return;
  }

  function replaceWord(node, oldWord, newWord) {
    if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = node.textContent.replace(oldWord, newWord);
    } else if (node.hasChildNodes()) {
        node.childNodes.forEach(childNode => {
            replaceWord(childNode, oldWord, newWord);
        });
    }
  }

  // normally cased names
  replaceWord(workText, otherName.regex, preferredName.name);

  // lower cased names
  replaceWord(workText, otherName.regexLower, preferredName.name.toLowerCase());

  // upper cased names
  replaceWord(workText, otherName.regexUpper, preferredName.name.toUpperCase());
})();