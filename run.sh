#!/usr/bin/env bash

build_docker_backend() {
  echo "Building backend docker image"
  docker build --tag another-flashcard-backend -f Dockerfile .
}


run_docker_backend(){
  echo "Running backend docker image"
  docker run --rm -it -p 8000:8000 another-flashcard-backend
}


build_and_run_backend(){
  build_docker_backend
  run_docker_backend
}


build_docker_frontend() {
  echo "Building frontend docker image"
  cd reagent-frontend
  docker build --tag another-flashcard-frontend -f ../Dockerfile.frontend .
  cd -
}


run_docker_frontend(){
  echo "Running frontend docker image"
  docker run --rm -it -p 9000:9000 another-flashcard-frontend
}


build_and_run_frontend(){
  build_docker_frontend
  run_docker_frontend
}


start_frontend() {
  # using https://github.com/reagent-project/reagent-template
  echo "Starting frontend for development"
  cd reagent-frontend
  lein figwheel
}

start_frontend_prod(){
  echo "Starting frontend for production"
  clj -m cljs.main --optimizations advanced -c another-flashcard-app.core
  clj -m cljs.main --serve
}


usage() {
    echo "Usage: $0 frontend | frontend_container | backend | build | docker | frontend_container"
    exit 1
}

CMD=${1:-}
shift || true
case ${CMD} in
  frontend) start_frontend ;;
  backend_container) build_and_run_backend ;;
  frontend_container) build_and_run_frontend ;;
  build_backend) build_docker_backend ;;
  backend_no_build) run_docker_backend ;;
  *) usage ;;
esac