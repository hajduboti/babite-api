export HOST_SRC_PATH="$(dirname $(readlink -f $0))"
echo "HOST SRC PATH = $HOST_SRC_PATH"
# echo "DEV_SCHEMA = $2"

# docker-compose -f $HOST_SRC_PATH/docker/docker-compose.yml up -d DEV_SCHEMA=$2
docker-compose -f $HOST_SRC_PATH/docker/docker-compose.yml up