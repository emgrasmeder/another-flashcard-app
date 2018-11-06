echo "building docker image"
docker build --tag another-flashcard-app -f Dockerfile .
echo "running docker image"
docker run -p 8000:8000 another-flashcard-app
