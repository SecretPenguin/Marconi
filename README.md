# Marconi

## Building

Run the `build.sh` script to create a `build` directory which can be zipped up and shipped off.

The `build` directory will have two subdirectories, one for the main site and one for the mobile site.

Running the script without any arguments will set the main domain to `marconi.dev` and the mobile site to `m.marconi.dev`. You can pass in an alternate domain name to the script, like so:

    ./build.sh newbellevueprogram.com
