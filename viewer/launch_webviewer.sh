#!/bin/bash -i
#
# Launches webviewer server on localhost.
#

set -e
set -u

# cd into the directory containing this script.
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
pushd "${SCRIPT_DIR}"

# Source utility functions and constants
source ./launch_webviewer_utils.sh

# Web viewer config.
SCENE_NAME="bicycle"
QUALITY="high"
PORT=8000

# Launch webserver
prepare_mipnerf360_scenes
install_dependencies
launch_webviewer
