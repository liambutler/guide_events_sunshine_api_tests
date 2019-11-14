#!/bin/bash

set -euo pipefail

OLD_PUID=1001
OLD_PGID=1001

if [ "$OLD_PUID" -ne "$PUID" ] || [ "$OLD_PGID" -ne "$PGID" ]; then
    groupmod -g "$PGID" "$PGROUP"
    usermod -g "$PGID" -u "$PUID" "$PUSER"
fi

exec /usr/local/bin/setuser "$PUSER" "$@"
