#!/bin/bash

# this treats files in ./src/sound-generation/faust/dsp-files as the source of faust instruments
# uses faust2wasm to generate files, with a modified code wrapper, and moves them to the right place
# it also generates a .ts file that has a list of available instruments by name.

FAUSTDIR=./src/sound-generation/faust

# clear destination directories
rm ./public/static/wasm/*.*
rm ./src/sound-generation/faust/workletnodes/*.*


# start faustModuleNames.ts
TSFILE=./src/sound-generation/faust/faustModuleNames.ts
echo "export const faustModuleNames = [" > $TSFILE



for file in ${FAUSTDIR}/dsp-files/*.dsp; do 
    BASENAME=$(basename $file)
    MODULENAME=${BASENAME%.dsp}
    echo "\n$MODULENAME"

    # generate files (use environment variable to use modified CODE_WRAPPER (template) files)
    FAUSTARCH="${FAUSTDIR}/modified-arch-files" faust2wasm -worklet $file
    # sed -i '1s/^/\/* eslint-disable *\/ \n/' ${MODULENAME}.js
    echo '/* eslint-disable */' | cat - ${MODULENAME}.js > tempworkletnode.js && mv tempworkletnode.js ${MODULENAME}.js

    # put them in their places
    mv ${MODULENAME}.wasm ./public/static/wasm
    mv ${MODULENAME}-processor.js ./public/static/wasm
    mv ${MODULENAME}.js ./src/sound-generation/faust/workletnodes


    # add a line to faustModuleNames.ts
    echo "'$MODULENAME'," >> $TSFILE
done

echo ] >> $TSFILE