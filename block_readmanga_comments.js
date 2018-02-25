// ==UserScript==
// @name         readmanga, mintmanga comment blocker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Blocks annoying comments on readmanga.ru, mintmanga.com
// @author       Yuuko Yonemura
// @match        http://readmanga.me/*
// @match        http://mintmanga.com/*
// @grant        none
// ==/UserScript==

;(function() {
  'use strict';

  const targetType = {
    byClass: 'byClass',
    byID: 'byID'
  };

  const targets = [
    {
      type: targetType.byClass,
      classList: ['rightContent']
    },
    {
      type: targetType.byClass,
      classList: ['posts-container']
    },
    {
      type: targetType.byID,
      id: ['twitts']
    }
  ];

  function purifyAll() {
    targets.forEach(purify);
  }

  function purify(target) {
    if (isClassTarget(target)) {
      purifyByClassList(target.classList);
    }

    if (isIDTarget(target)) {
      purifyByID(target.id);
    }
  }

  function isClassTarget(target) {
    return target.type === targetType.byClass;
  }
  function isIDTarget(target) {
    return target.type === targetType.byID;
  }

  function purifyByClassList(classList) {
    let selector = createClassListSelector(classList);
    let nodes = queryNodesBySelector(selector);
    nodeListForEach(nodes, hideNode);
  }

  function createClassListSelector(classList) {
    return '.' + classList.join(' .');
  }

  function queryNodesBySelector(selector) {
    return document.querySelectorAll(selector);
  }

  function nodeListForEach(nodeList, executable) {
    let nodeArray = Array.prototype.slice.call(nodeList);
    nodeArray.forEach(executable);
  }

  function hideNode(node) {
    node.style.display = 'none';
  }

  function purifyByID(id) {
    let node = document.getElementById(id);

    if (node) {
      hideNode(node);
    }
  }

  purifyAll();
})();
