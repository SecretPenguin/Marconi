#!/bin/bash
set -e

function main() {
  process_site "main" $1
  clean_up
  process_site "mobile" "m.$1"
  clean_up
}

function process_site() {
  src=$1
  dst=build/$src
  domain=$2

  echo "processing $src site as $domain..."

  prepare
  copy_extras
  process_js
  process_css
  process_images
  process_index $domain
}

function prepare() {
  rm -rf $dst
  mkdir -p $dst/js/vendor $dst/css $dst/images
}

function clean_up() {
  rm -f combined.{css,js} minified.{css,js}
}

function process_js() {
  combine_js
  minify_js
  checksum_js
}

function copy_extras() {
  if [ -f $src/js/vendor/ZeroClipboard.swf ]; then
    cp $src/js/vendor/ZeroClipboard.swf $dst/js/vendor/
  fi

  if [ -e $src/fonts ]; then
    cp -r $src/fonts $dst/fonts
  fi
}

function combine_js() {
  echo "combining js..."
  for file in `cat $src/js_manifest.txt`; do
    echo_sans_bom ./$src/$file >> combined.js
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
  cp minified.js $dst/js/all-$checksum.js
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
  for file in `cat $src/css_manifest.txt`; do
    echo_sans_bom ./$src/$file >> combined.css
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
  cp minified.css $dst/css/all-$checksum.css
}

function process_images() {
  copy_images
}

function copy_images() {
  echo "copying images..."
  cp -r $src/images $dst/
}

function process_index() {
  echo "processing index..."
  export MARCONI_PRODUCTION=true
  export MARCONI_SERVER_NAME=$1
  php $src/index.php > $dst/index.html
}

domain=marconi.dev

if [ -n "$1" ]; then domain=$1; fi

main $domain
