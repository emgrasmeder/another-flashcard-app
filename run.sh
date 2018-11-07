#!/usr/bin/env bash

build_docker() {
  echo "Building docker image"
  docker build --tag another-flashcard-app -f Dockerfile .
}


run_docker(){
  echo "Running docker image"
  docker run --rm -it -p 8000:8000 another-flashcard-app
}


build_and_run(){
  build_docker
  run_docker
}


start_frontend() {
  cd frontend
  clj --main cljs.main --compile another-flashcard-app.core --repl
}


usage() {
    echo "Usage: $0 frontend | backend | build | docker"
    exit 1
}

CMD=${1:-}
shift || true
case ${CMD} in
  frontend) start_frontend ;;
  backend) build_and_run ;;
  build) build_docker ;;
  docker) run_docker ;;
  *) usage ;;
esac