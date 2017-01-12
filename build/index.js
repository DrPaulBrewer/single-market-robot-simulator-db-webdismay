"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.openList = openList;
exports.promiseUpload = promiseUpload;
exports.promiseList = promiseList;
exports.promiseListRange = promiseListRange;
exports.promiseSaveItem = promiseSaveItem;
exports.promiseRemoveItem = promiseRemoveItem;
exports.promiseMoveItem = promiseMoveItem;

var _webdismay = require("webdismay");

var WDM = _interopRequireWildcard(_webdismay);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function openList(name) {
    return WDM.list(name);
} /* Copyright 2017 Paul Brewer, Economic and Financial Technology Consulting LLC */
/* This file is open source software.  The MIT License applies to this software. */

function promiseUpload(blob) {
    var url = arguments.length <= 1 || arguments[1] === undefined ? "/upload" : arguments[1];

    return WDM.request([blob], url);
}

function promiseList(list) {
    return list.getAll();
}

function promiseListRange(list, iFrom, iTo) {
    return list.slice(iFrom, iTo);
}

function promiseSaveItem(item, list) {
    return list.unshift(item);
}

function promiseRemoveItem(item, list) {
    return list.remove(item);
}

function promiseMoveItem(item, list1, list2) {
    return new Promise(function (resolve, reject) {
        list2.len().then(function (destSize) {
            list2.unshift(item).then(function (newDestSize) {
                if (newDestSize > destSize) {
                    list1.remove(item).then(function (removedCount) {
                        if (removedCount === 1) {
                            return resolve(1);
                        }
                        list2.shift().then(function () {
                            return reject("Error: move between lists failed in promiseMoveItem");
                        });
                    });
                }
            });
        });
    });
}
