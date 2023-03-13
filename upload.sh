#!/bin/bash

set -e

gsutil -m -h "Cache-Control: public, max-age=86400" cp -r images/* gs://static-root
