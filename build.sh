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
  mkdir -p build/js build/css build/images
}

function clean_up() {
  rm -f combined.{css,js} minified.{css,js}
  # rm -rf build
}

function process_js() {
  combine_js
  minify_js
  checksum_js
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
   cat combined.css | sed -e 's/^[ \t]*//g; s/[ \t]*$//g; s/\([:{;,]\) /\1/g; s/ {/{/g; s/\/\*.*\*\///g; /^$/d' \
    | sed -e :a -e '$!N; s/\n\(.\)/\1/; ta' > minified.css
}

function checksum_css() {
  echo "checksumming css..."
  checksum=`md5 -q minified.css`
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
