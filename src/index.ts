import { check, read } from "@jstc/core"
import minimist from "minimist"
/**
 * Converting Javascript to Python
 * @module main
 */
export default async (): Promise<1 | 0> =>
{
    const acorn = await import( "acorn" )
    const fs = await import( "fs" )
    const path = await import( "path" )
    const argv = minimist( process.argv.slice( 2 ), {
        alias: {
            m: "mode",
            t: "test",
            v: "version",
            o: "out",
            n: "not",
            op: "optimisation"
        }
    } )
    /**
     * @const
     * @type {any}
     */
    const parse: any = ( () =>
    {
        return acorn?.parse( read( path.resolve( path.resolve( process.argv[ 2 ] ) ) ), {
            ecmaVersion: "latest",
            allowAwaitOutsideFunction: true,
            allowImportExportEverywhere: true,
            allowReserved: true
        } )
    } )()
    /**
     * @type {string}
     */
    //versionオプションの確認
    if ( argv.v )
    {
        ( async function (): Promise<void>
        {
            const v = await import( "./../package.json" )
            console.log( v.version );
        } )()
    }
    if ( !argv._[ 0 ] )
    {
        return 0;
    }
    //出力先の変数
    let out: string = "jstc_build";
    //outオプションの確認
    if ( argv.o )
    {
        if ( typeof argv.o !== "string" )
        {
            console.log( "引数が不足しています" );
        } else
        {
            out = argv.o
        }
    }
    //out先のフォルダが無かったら作成
    if ( !check( path.resolve( out ) ) )
    {
        fs.mkdir( path.resolve( out ), ( err ): void =>
        {
            if ( err )
            {
                throw err;
            }
        } );
    }
    if ( !argv.not )
    {
        let mode: string;
        if ( typeof argv.m !== "string" )
        {
            console.log( "引数が不足しています" );
            console.log( "modeにはpython or rubyの指定をして下さい" );

        } else
        {
            mode = argv.m
            if ( mode == "py" || mode == "python" )
            {
                mode = "python";
                //js解析結果からpythonに変換して出力
                ( async (): Promise<void> =>
                {
                    const { python } = await import( "@jstc/core" )
                    let c = new python( { codes: parse, mode: mode, option: { optimisation: argv.op } } )
                    fs.writeFileSync( `${ path.resolve( out ) }/index.py`, c.parse.code, "utf8" )
                    console.log( c.parse.code );

                } )()
            } else if ( mode == "rb" || mode == "ruby" )
            {
                mode = "ruby";
                ( async (): Promise<void> =>
                {
                    const { ruby } = await import( "@jstc/core" )
                    let c = new ruby( { codes: parse, mode: mode, option: { optimisation: argv.op } } )
                    fs.writeFileSync( `${ path.resolve( out ) }/index.rb`, c.parse.code, "utf8" )
                    console.log( c.parse.code );

                } )()
            } else
            {
                ( async () =>
                {
                    const { python } = await import( "@jstc/core" )
                    let c = new python( { codes: parse, mode: "python", option: { optimisation: argv.op } } )
                    fs.writeFileSync( `${ path.resolve( out ) }/index.py`, c.parse.code, "utf8" )
                    console.log( c.parse.code );
                } )()
            }
        }
    }

    //解析結果出力オプションの確認
    if ( argv.t )
    {
        fs.writeFileSync( path.resolve( `${ path.resolve( out ) }/build.json` ), parse ? JSON.stringify( parse ) : "{}", 'utf8' )
    }
    return 0;

}
