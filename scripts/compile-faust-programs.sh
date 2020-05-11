#!/bin/bash

FAUSTDIR=./src/sound-generation/faust

for file in ${FAUSTDIR}/dsp-files/*.dsp; do 
    BASENAME=$(basename $file)
    MODULENAME=${BASENAME%.dsp}
    echo "\n$MODULENAME"

    # generate files (use environment variable to use modified CODE_WRAPPER (template) files)
    FAUSTARCH="${FAUSTDIR}/modified-arch-files" faust2wasm -worklet $file

    mv ${MODULENAME}.wasm ./public/static/wasm
    mv ${MODULENAME}-processor.js ./public/static/wasm
    mv ${MODULENAME}.js ./src/sound-generation/faust/workletnodes

done