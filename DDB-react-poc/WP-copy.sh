#!/bin/bash

# --- Setup env variables ---

# imported env vars:
# - TEMPLATE_DIR

SERVER_DIR="DDB_SERVER"
SERVER_FILE="Server.csp"
UPLOADS_DIR="DDB_UPLOAD"
DATA_DIR="DDB_DATA"
MASTER_DATA_FOLDER_NAME="__master__"
INIT_DATA_FILES_PATH="./initDataFiles"
TARGET_DIR="/c/Program Files (x86)/CaseWare/Template/$TEMPLATE_DIR"

export REACT_APP_SERVER_PATH="cw:$SERVER_DIR/$SERVER_FILE"



# --- Copy build files ---

echo "Copying build files to WP location..."

cp -a "./build/." "$TARGET_DIR/"

# Setup and copy server code
mkdir -p "$TARGET_DIR/$SERVER_DIR"
chmod 777 "$TARGET_DIR/$SERVER_DIR"
cp -a "./src/csp/." "$TARGET_DIR/$SERVER_DIR"

echo "Copy completed."



# --- Setup data directories ---

echo "Setting up data directories..."

# Make sure the uploads directory exists
if [ ! -d "$TARGET_DIR/$UPLOADS_DIR" ]; then
    mkdir -p "$TARGET_DIR/$UPLOADS_DIR"
    chmod 777 "$TARGET_DIR/$UPLOADS_DIR"
fi

# Make sure the data directory exists and contains all the data json files
if [ ! -d "$TARGET_DIR/$DATA_DIR" ]; then
    mkdir -p "$TARGET_DIR/$DATA_DIR/$MASTER_DATA_FOLDER_NAME"
    cp "$INIT_DATA_FILES_PATH/general.json" "$TARGET_DIR/$DATA_DIR/$MASTER_DATA_FOLDER_NAME/general.json"
    cp "$INIT_DATA_FILES_PATH/tabs.json" "$TARGET_DIR/$DATA_DIR/$MASTER_DATA_FOLDER_NAME/tabs.json"
    cp "$INIT_DATA_FILES_PATH/themes.json" "$TARGET_DIR/$DATA_DIR/$MASTER_DATA_FOLDER_NAME/themes.json"
    cp "$INIT_DATA_FILES_PATH/widgetPresets.json" "$TARGET_DIR/$DATA_DIR/$MASTER_DATA_FOLDER_NAME/widgetPresets.json"

    chmod 777 "$TARGET_DIR/$DATA_DIR/$MASTER_DATA_FOLDER_NAME" \
        "$TARGET_DIR/$DATA_DIR/$MASTER_DATA_FOLDER_NAME/general.json" \
        "$TARGET_DIR/$DATA_DIR/$MASTER_DATA_FOLDER_NAME/tabs.json" \
        "$TARGET_DIR/$DATA_DIR/$MASTER_DATA_FOLDER_NAME/themes.json" \
        "$TARGET_DIR/$DATA_DIR/$MASTER_DATA_FOLDER_NAME/widgetPresets.json"
fi

echo "Data directories setup complete."



# --- Completion ---

echo "Done!"

echo $HOSTNAME $SECONDS >> buildTimes.txt

read -n 1 -s -r -p "Press any key to continue..."