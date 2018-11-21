#!/bin/bash

set -eu


outfile="react/Icon/icons-sprite.js"
outfile_transpiled="transpiled/react/Icon/icons-sprite.js"

echo "Making icon sprite, output file: $1"
yarn svgstore -o /tmp/icons-sprite.svg assets/icons/ui/*.svg --inline
echo "// GENERATED FILE, DO NOT EDIT THIS FILE BY HAND" > $outfile
echo "// Use yarn sprite to regenerate" >> $outfile
echo "module.exports = \``cat /tmp/icons-sprite.svg`\`" >> $outfile
yarn babel $outfile -o $outfile_transpiled
yarn lint:js --fix $outfile
