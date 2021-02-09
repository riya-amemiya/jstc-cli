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
            n: "not"
        }
    } )
    /**
     * @const
     * @type {any}
     */
    const parse: any = acorn?.parse( read( path.resolve( path.resolve( process.argv[ 2 ] ) ) ), {
        ecmaVersion: "latest",
        allowAwaitOutsideFunction: true,
        allowImportExportEverywhere: true,
        allowReserved: true
    } )
    /**
     * @type {string}
     */
    //versionオプションの確認
    if ( argv.v )
    {
        await ( async function (): Promise<void>
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
    if ( argv.not )
    {
        let mode;
        if ( typeof argv.m !== "string" )
        {
            console.log( "引数が不足しています" );
        } else
        {
            mode = argv.m
            if ( mode == "py" || mode == "python" )
            {
                //js解析結果からpythonに変換して出力
                await ( async () =>
                {
                    const { python } = await import( "@jstc/core" )
                    let c = python( parse, "python" )
                    fs.writeFileSync( `${ path.resolve( out ) }/index.py`, c.code, "utf8" )
                    console.log( c.code );

                } )()
            } else if ( mode == "rb" || mode == "ruby" )
            {
                await ( async () =>
                {
                    const { ruby } = await import( "@jstc/core" )
                    let c = ruby( parse, "ruby" )
                    fs.writeFileSync( `${ path.resolve( out ) }/index.rb`, c.code, "utf8" )
                    console.log( c.code );

                } )()
            } else
            {
                await ( async () =>
                {
                    const { python } = await import( "@jstc/core" )
                    let c = python( parse, "python" )
                    fs.writeFileSync( `${ path.resolve( out ) }/index.py`, c.code, "utf8" )
                    console.log( c.code );
                } )()
            }
        }
    } else
    {
        await ( async () =>
        {
            const { python } = await import( "@jstc/core" )
            let c = python( parse, "python" )
            fs.writeFileSync( `${ path.resolve( out ) }/index.py`, c.code, "utf8" )
            console.log( c.code );
        } )()
    }

    //解析結果出力オプションの確認
    if ( argv.t )
    {
        fs.writeFileSync( path.resolve( `${ path.resolve( out ) }/build.json` ), parse ? JSON.stringify( parse ) : "{}", 'utf8' )
    }
    return 0;

}
