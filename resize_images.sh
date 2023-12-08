#!/bin/bash

# Set the input and output folders
input_folder="/Users/creiser/research/blockmerf/webpage/assets/img/merf/scene_preview_hd"
output_folder="/Users/creiser/research/blockmerf/webpage/assets/img/merf/scene_preview"

# Create output folder if it doesn't exist
mkdir -p "$output_folder"

# Set the target size
target_size="320x240"

# Loop through all images in the input folder
for image_path in "$input_folder"/*.{png,jpg,jpeg}; do
    # Get the filename without the path
    filename=$(basename "$image_path")

    # Set the output path
    output_path="$output_folder/$filename"

    # Resize the image using ImageMagick's convert tool
    convert "$image_path" -resize "$target_size^" -gravity center -extent "$target_size" "$output_path"

    echo "Resized $filename to $target_size"
done
