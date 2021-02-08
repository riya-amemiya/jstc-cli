#!/usr/bin/env node

require("../build_cli/index").default().then(num => num && console.error("エラー発生"))