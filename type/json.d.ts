declare module "*/package.json" {
    interface RootObject
    {
        name: string;
        version: string;
        description: string;
        main: string;
        scripts: Scripts;
        keywords: any[];
        author: string;
        license: string;
        devDependencies: DevDependencies;
        dependencies: Dependencies;
        bin: Bin;
    }

    interface Bin
    {
        jstc: string;
    }

    interface Dependencies
    {
        '@jstc/core': string;
        acorn: string;
        'acorn-loose': string;
        'acorn-node': string;
        'acorn-walk': string;
        chalk: string;
        minimist: string;
        tslib: string;
    }

    interface DevDependencies
    {
        '@babel/cli': string;
        '@babel/core': string;
        '@babel/plugin-proposal-class-properties': string;
        '@babel/plugin-proposal-object-rest-spread': string;
        '@babel/plugin-proposal-optional-chaining': string;
        '@babel/plugin-transform-async-to-generator': string;
        '@babel/plugin-transform-object-super': string;
        '@babel/plugin-transform-template-literals': string;
        '@babel/preset-env': string;
        '@babel/preset-typescript': string;
        '@types/chalk': string;
        '@types/minimist': string;
        'babel-core': string;
        'babel-jest': string;
        'babel-plugin-minify-builtins': string;
        'babel-plugin-minify-constant-folding': string;
        'babel-plugin-minify-dead-code-elimination': string;
        'babel-plugin-minify-guarded-expressions': string;
        'babel-plugin-minify-mangle-names': string;
        'babel-plugin-minify-simplify': string;
        'babel-plugin-transform-inline-consecutive-adds': string;
        'babel-plugin-transform-merge-sibling-variables': string;
        'babel-plugin-transform-minify-booleans': string;
        babili: string;
        fcc_typescript: string;
        'gh-pages': string;
        typedoc: string;
        typescript: string;
    }

    interface Scripts
    {
        test: string;
        typescript: string;
        babel: string;
        build: string;
        start: string;
        typedoc: string;
        deploy: string;
        build_babel: string;
    }
    const json: RootObject;
    export = json
}