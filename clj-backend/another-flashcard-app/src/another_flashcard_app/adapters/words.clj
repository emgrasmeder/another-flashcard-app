(ns another-flashcard-app.adapters.words
  (:require [another-flashcard-app.ports.words :as ports.words]
            [another-flashcard-app.core :as core]
            [clojure.java.io :as io]
            [cheshire.core :as cheshire])
  (:import (java.util UUID)))


(defn write-feedback
  [m]
  (cheshire/generate-stream m (io/writer (io/resource "log.ndjson") :append true))
  (spit (io/resource "log.ndjson") "\n" :append true))

(defn get-headers [file]
  (->> file
       ports.words/fetch-rows-from
       (take 1)
       first
       (map keyword)))

(defn insert-word
  [m]
  (let [csv-headers (get-headers "words.csv")
        id (str (UUID/randomUUID))
        new-word (core/map->csv (assoc m :id id) csv-headers)]
    (ports.words/insert-word-in new-word (io/resource "words.csv"))
    id))

(defn search
  [query]
  (-> "words.csv"
      ports.words/fetch-from
      (core/search-fuzzy query)))

(defn rand-word []
  (-> "words.csv"
      ports.words/fetch-from
      rand-nth))