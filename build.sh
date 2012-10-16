#!/bin/bash
set -e

function main() {
  prepare
  process_js
  process_css
  process_images
  process_index
  clean_up
}

function prepare() {
  rm -rf build
  mkdir -p build/js/vendor build/css build/images
}

function clean_up() {
  rm -f combined.{css,js} minified.{css,js}
}

function process_js() {
  copy_extras
  combine_js
  minify_js
  checksum_js
}

function copy_extras() {
  cp js/vendor/ZeroClipboard.swf build/js/vendor/
}

function combine_js() {
  echo "combining js..."
  for file in `cat js_manifest.txt`; do
    echo_sans_bom ./$file >> combined.js
  done
}

function minify_js() {
  echo "minifying js..."
  url=http://marijnhaverbeke.nl/uglifyjs
  curl --silent --data-urlencode js_code@combined.js $url  > minified.js
}

function checksum_js() {
  echo "checksumming js..."
  checksum=`md5 -q minified.js`
  cp minified.js build/js/all-$checksum.js
}

function echo_sans_bom() {
  awk '{if(NR==1)sub(/^\xef\xbb\xbf/,"");print}' $1
}

function process_css() {
  combine_css
  minify_css
  checksum_css
}

function combine_css() {
  echo "combining css..."
  for file in `cat css_manifest.txt`; do
    echo_sans_bom ./$file >> combined.css
  done
}

function minify_css() {
  echo "minifying css..."
  cat combined.css \
  | sed 's/^[[:space:]]*//' `# remove leading tabs/spaces` \
  | sed 's/[[:space:]]*$//' `#remove trailing tabs/spaces` \
  | sed 's/  */ /g'         `#collapse multiple spaces` \
  | sed 's/\/\*.*\*\///g'   `#remove single line comments` \
  | sed 's/{ /{/g'          `#remove left bracket white space` \
  | sed 's/; }/;}/g'        `#remove right bracket white space` \
  | sed '/^$/d'             `#delete blank lines` \
  > minified.css
}

function checksum_css() {
  echo "checksumming css..."
  checksum=`md5 -q combined.css`
  cp minified.css build/css/all-$checksum.css
}

function process_images() {
  copy_images
}

function copy_images() {
  echo "copying images..."
  cp -r images build/
}

function process_index() {
  echo "processing index..."
  export MARCONI_PRODUCTION=true
  export MARCONI_SERVER_NAME=marconi.dev
  php index.php > build/index.html
}

main
