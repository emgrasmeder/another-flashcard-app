(ns another-flashcard-app.adapters.words
  (:require [cheshire.core :as cheshire]
            [another-flashcard-app.ports.words :as words]
            [another-flashcard-app.ports.words :as ports.words]))


(defn rand-word
  [filename]
  (-> (ports.words/fetch-from filename)
      rand-nth
      cheshire/generate-string))