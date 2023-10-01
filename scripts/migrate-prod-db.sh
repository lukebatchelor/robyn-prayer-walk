#/bin/sh

# exit if any command fails
set -e

SCRIPT_PATH_ABS=$(realpath "$0")
ROOT_DIR=$(dirname $(dirname "$SCRIPT_PATH_ABS"))

source "$ROOT_DIR/.env"

if [ -z $PROD_REMOTE_DB_PATH -o -z $PROD_LOCAL_DB_PATH ]
then
  echo "PROD_REMOTE_DB_PATH and PROD_LOCAL_DB_PATH must be set to run migration"
  exit 1
fi

scp $PROD_REMOTE_DB_PATH ./$PROD_LOCAL_DB_PATH
DATABASE_URL=file:../$PROD_LOCAL_DB_PATH yarn prisma migrate deploy
scp ./$PROD_LOCAL_DB_PATH $PROD_REMOTE_DB_PATH
