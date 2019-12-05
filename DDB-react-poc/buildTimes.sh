#!/bin/bash
while read line; do
tokens=( $line )
echo ${tokens[1]} >> buildTimesTemp.txt
done < buildTimes.txt

seconds=$(awk '{s+=$1} END {printf "%.0f\n", s}' buildTimesTemp.txt)
echo "Total time spent building:" $((seconds / 60))m $((seconds % 60))s
rm buildTimesTemp.txt