(ns another-flashcard-app.adapters.words
  (:require [another-flashcard-app.ports.words :as ports.words]
            [another-flashcard-app.core :as core]
            [clojure.java.io :as io]
            [cheshire.core :as cheshire]))


(defn write-feedback
  [m]
  (cheshire/generate-stream m (io/writer (io/resource "log.ndjson") :append true))
  (spit (io/resource "log.ndjson") "\n" :append true))

(defn search
  [query]
  (-> (ports.words/fetch-from "words.csv")
      (core/search query)))

(defn rand-word []
  (-> (ports.words/fetch-from "words.csv")
      rand-nth))