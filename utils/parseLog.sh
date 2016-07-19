#!/bin/bash

while read line; do
    curl -X POST -d  "data=$line" http://localhost/process.php
done
