export HOST_SRC_PATH="$(dirname "$(dirname "$(readlink -fm "$0")")")"
echo "HOST SRC PATH = $HOST_SRC_PATH"
echo "DEV_SCHEMA = $2"

docker-compose -f docker-compose.yml up -d web