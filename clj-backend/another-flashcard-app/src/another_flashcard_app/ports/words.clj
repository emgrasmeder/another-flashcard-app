(ns another-flashcard-app.ports.words
  (:require [clojure.data.csv :as csv]
            [clojure.java.io :as io]
            [cheshire.core :as cheshire]))

(defn csv->maps [csv-data]
  (map zipmap
       (->> (first csv-data) ;; First row is the header
            (map keyword) ;; Drop if you want string keys instead
            repeat)
       (rest csv-data)))

(defn fetch []
  (-> "words.csv"
      io/resource
      io/reader
      csv/read-csv
      csv->maps
      rand-nth
      cheshire/generate-string))


