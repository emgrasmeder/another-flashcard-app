(ns another-flashcard-app.adapters.words
  (:require [another-flashcard-app.ports.words :as ports.words]
            [another-flashcard-app.core :as core]))



(defn search
  [query]
  (println "searching for" query)
  (-> (ports.words/fetch-from "words.csv")
      (core/search query)))

(defn rand-word []
  (-> (ports.words/fetch-from "words.csv")
      rand-nth))