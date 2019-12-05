#!/bin/bash

# --- Setup env variables ---

# imported env vars:
# - TEMPLATE_DIR

UPLOADS_DIR="DDB_UPLOAD"
DATA_DIR="DDB_DATA"
MASTER_DATA_FOLDER_NAME="__master__"
INIT_DATA_FILES_PATH="./initDataFiles"
TARGET_DIR="/c/Program Files (x86)/CaseWare/Template/$TEMPLATE_DIR"



# --- Reset data directories ---

echo "Resetting data directories..."

rm -rf "$TARGET_DIR/$UPLOADS_DIR"

mkdir -p "$TARGET_DIR/$UPLOADS_DIR"
chmod 777 "$TARGET_DIR/$UPLOADS_DIR"

rm -rf "$TARGET_DIR/$DATA_DIR"

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

echo "Data directories reset."



# --- Completion ---

echo "Done!"

echo $HOSTNAME $SECONDS >> buildTimes.txt

read -n 1 -s -r -p "Press any key to continue..."