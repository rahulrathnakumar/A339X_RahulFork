#!/bin/bash

set -ex

#remove directory if it exist
rm -rvf ./build-common

# copy from FBW COMMON source and HDW COMMON into one src
cp -rva ./flybywire/fbw-common/. ./build-common
cp -rva ./hdw-common/. ./build-common

#remove directory if it exist
rm -rvf ./build-a339x

# create directory
mkdir -p ./build-a339x/src
mkdir -p ./build-a339x/out

# copy from FBW A32NX source and A339X into one src
cp -rva ./flybywire/fbw-a32nx/src/behavior/. ./build-a339x/src/behavior
cp -rva ./flybywire/fbw-a32nx/src/fonts/. ./build-a339x/src/fonts
cp -rva ./flybywire/fbw-a32nx/src/localization/. ./build-a339x/src/localization
cp -rva ./flybywire/fbw-a32nx/src/systems/. ./build-a339x/src/systems
cp -rva ./flybywire/fbw-a32nx/src/wasm/. ./build-a339x/src/wasm

cp -rva ./hdw-a339x/.env ./build-a339x/.env
cp -rva ./hdw-a339x/mach.config.js ./build-a339x/mach.config.js

cp -rva ./hdw-a339x/src/behavior/. ./build-a339x/src/behavior
cp -rva ./hdw-a339x/src/localization/. ./build-a339x/src/localization
cp -rva ./hdw-a339x/src/model/. ./build-a339x/src/model
cp -rva ./hdw-a339x/src/systems/. ./build-a339x/src/systems
cp -rva ./hdw-a339x/src/wasm/. ./build-a339x/src/wasm

mkdir -p ./build-a339x/out/headwindsim-aircraft-a330-900
mkdir -p ./build-a339x/out/headwindsim-aircraft-a330-900-lock-highlight

mkdir -p ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/CSS
mkdir -p ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Fonts
mkdir -p ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Images
mkdir -p ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/JS
mkdir -p ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Pages/VCockpit/Instruments/Airliners
mkdir -p ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Pages/VCockpit/Instruments/FlightElements
mkdir -p ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Pages/VCockpit/Instruments/NavSystems
mkdir -p ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Pages/VLivery/Liveries/Printer
mkdir -p ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Pages/VLivery/Liveries/Registration

cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/CSS/. ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/CSS/A339X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Fonts/fbw-a32nx/. ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Fonts/A339X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Images/fbw-a32nx/. ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Images/A339X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/JS/fbw-a32nx/. ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/JS/A339X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Core ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Pages/A339X_Core
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Utils ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Pages/A339X_Utils
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/Airliners/FlyByWire_A320_Neo ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Pages/VCockpit/Instruments/Airliners/Headwind_A339X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/FlightElements ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Pages/VCockpit/Instruments/FlightElements/A339X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/NavSystems/A320_Neo ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Pages/VCockpit/Instruments/NavSystems/A339X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Registration ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Pages/VLivery/Liveries/Registration/A339X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Printer ./build-a339x/out/headwindsim-aircraft-a330-900/html_ui/Pages/VLivery/Liveries/Printer/A339X

# copy base of A339X to out
cp -rva ./hdw-a339x/src/base/headwindsim-aircraft-a330-900/. ./build-a339x/out/headwindsim-aircraft-a330-900
cp -rva ./hdw-a339x/src/base/headwindsim-aircraft-a330-900-lock-highlight/. ./build-a339x/out/headwindsim-aircraft-a330-900-lock-highlight

chmod +x ./build-a339x/src/wasm/fbw_a320/build.sh
chmod +x ./build-a339x/src/wasm/fadec_a320/build.sh
chmod +x ./build-a339x/src/wasm/flypad-backend/build.sh

##### ACJ330neo

# remove directory if it exist
rm -rvf ./build-a339x-acj

# create directory
mkdir -p ./build-a339x-acj/src

mkdir -p ./build-a339x-acj/src/localization
mkdir -p ./build-a339x-acj/src/systems
mkdir -p ./build-a339x-acj/src/wasm

# copy from FBW A32NX source and A339X into one src

cp -rva ./build-a339x/src/localization/. ./build-a339x-acj/src/localization
cp -rva ./build-a339x/src/systems/. ./build-a339x-acj/src/systems
cp -rva ./build-a339x/src/wasm/. ./build-a339x-acj/src/wasm
cp -rva ./build-a339x/.env ./build-a339x-acj/.env

cp -rva ./hdw-a339x-acj/src/systems/. ./build-a339x-acj/src/systems
cp -rva ./hdw-a339x-acj/src/wasm/. ./build-a339x-acj/src/wasm

cp -rva ./hdw-a339x-acj/mach.config.js ./build-a339x-acj/mach.config.js

# copy base of A339X to out
cp -rva ./hdw-a339x-acj/src/base/headwindsim-aircraft-a330-900/. ./build-a339x/out/headwindsim-aircraft-a330-900

chmod +x ./build-a339x-acj/src/wasm/fbw_a320/build.sh
chmod +x ./build-a339x-acj/src/wasm/fadec_a320/build.sh
chmod +x ./build-a339x-acj/src/wasm/flypad-backend/build.sh
