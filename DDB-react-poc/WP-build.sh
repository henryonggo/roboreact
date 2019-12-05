#!/bin/bash

# # --- Setup env variables ---

# # imported env vars:
# # - TEMPLATE_DIR

# Set the target directory
export TARGET_DIR="/c/Program Files (x86)/CaseWare/Template/$TEMPLATE_DIR"

# Run the build script
bash ./build.sh
