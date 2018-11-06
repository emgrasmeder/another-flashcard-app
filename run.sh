echo "building docker image"
docker build --tag another-flashcard-app -f Dockerfile .
echo "running docker image"
docker run another-flashcard-app
