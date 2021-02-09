# JCTC
javascriptを他の言語に変換する最高にイカれたライブラリです

## 使い方

```npm i -g @jstc/cli```

```jstc filepath```

## オプション

`-m,--mode` 省略可能(デフォルトはpython)
変換先の言語を指定(現在はpythoとrubyのみサポート)

`-t,--test` ASTをJSONで出力するオプションです

`-o,--out` 出力先のフォルダを指定します

`-v,--version` バージョンを出力します