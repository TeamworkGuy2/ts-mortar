/// <reference path="../node/node.d.ts" />

declare module 'gulp' {
    export function src(...args: any[]): any;
    export function dest(...args: any[]): any;
    export function task(...args: any[]): any;
    export function watch(...args: any[]): any;
}

declare module 'gulp-6to5' {
    function gulp6To5(...args: any[]): any;
    export = gulp6To5;
}

declare module 'gulp-util' {
    export var env: {};
    export function log(...args: any[]): any;
}

declare module 'gulp-concat' {
    function gulpConcat(...args: any[]): any;
    export = gulpConcat;
}

declare module 'gulp-express' {
    export function run(...args: any[]): any;
    export var notify: any;
}

declare module 'gulp-sass' { }

declare module 'gulp-minify-css' { }

declare module 'gulp-rename' {
    function gulpRename(...args: any[]): any;
    export = gulpRename;
}

declare module 'gulp-uglify' {
    function gulpUglify(...args: any[]): any;
    export = gulpUglify;
}

declare module 'browserify' { }

declare module 'del' {
    function del(...args: any[]): any;
    export = del;
}

declare module 'es6ify' {
    export function configure(...args: any[]): any;
    export var traceurOverrides: any;
}

declare module 'exorcist' {
    function exorcist(...args: any[]): any;
    export = exorcist;
}

declare module 'karma' {
    export var server: {
        start(...args: any[]): any;
    };
}

declare module 'q' { }

declare module 'reactify' { }

declare module 'run-sequence' {
    function runSequence(...args: any[]): any;
    export = runSequence;
}

declare module 'vinyl-source-stream' {
    function vinylSourceStream(...args: any[]): any;
    export = vinylSourceStream;
}

declare module 'watchify' {
    function watchify(...args: any[]): any;
    export = watchify;
}
