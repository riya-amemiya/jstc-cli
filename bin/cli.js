#!/usr/bin/env node

require("../build/index").default().then(num => num && console.error("エラー発生"))