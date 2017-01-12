/* Copyright 2017 Paul Brewer, Economic and Financial Technology Consulting LLC */
/* This file is open source software.  The MIT License applies to this software. */

import * as WDM from "webdismay";

export function openList(name){
    return WDM.list(name);
}

export function promiseUpload(blob, url="/upload"){
    return WDM.request([blob], url);
}

export function promiseList(list){
    return list.getAll();
}

export function promiseListRange(list, iFrom, iTo){
    return list.slice(iFrom,iTo);
}

export function promiseSaveItem(item, list){
    return list.unshift(item);
}

export function promiseRemoveItem(item, list){
    return list.remove(item);
}                        

export function promiseMoveItem(item,list1,list2){
    return new Promise(function(resolve, reject){
        (list2
         .len()
         .then(function(destSize){
             (list2
              .unshift(item)
              .then(function(newDestSize){
                  if (newDestSize>destSize){
                      (list1
                       .remove(item)
                       .then(function(removedCount){
                           if (removedCount===1){
                               return resolve(1);
                           }
                           list2.shift().then(function(){
                               return reject("Error: move between lists failed in promiseMoveItem");
                           });
                       })
                      );
                  }
              })
             );
         })
        );
    });
}

