# JCTC
javascriptを他の言語に変換する最高にイカれたライブラリです

## 依存関係

コードの変換

[@jstc/core](https://github.com/riya81/jstc-core)

cliの引数のパースに使用しています

[minimist](https://github.com/substack/minimist)

エラーメッセージに使用してます

[chalk](https://github.com/chalk/chalk)

jsの解析に使用しています

[acorn](https://github.com/acornjs/acorn)

## 使い方

```npm i -g @jstc/cli```

```jstc filepath```

## Demo

```git clone https://github.com/riya81/jstc-cli.git```

```cd jstc-cli```

```npm i```

```npm run build```

```node bin/cli.js demo/test.js -o demo -m py```


## オプション

`-m,--mode` 省略可能(デフォルトはpython)

変換先の言語を指定(現在はpythoとrubyのみサポート)

python | py | ruby | rb

`-t,--test` ASTをJSONで出力するオプションです

`-o,--out` 出力先のフォルダを指定します

`-v,--version` バージョンを出力します