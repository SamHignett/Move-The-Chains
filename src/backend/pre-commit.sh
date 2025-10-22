#!/usr/bin/env bash
cd "$(dirname "$0")"
echo "Verifying Code Styling with dotnet format..."

#dotnet format --verify-no-changes
dotnet format style --verify-no-changes
dotnet format analyzers --verify-no-changes

STATUS=$?
if [ $STATUS -ne 0 ]; then
    echo -e "\nCode formatting issues detected. Fix before committing."
    exit $STATUS
fi