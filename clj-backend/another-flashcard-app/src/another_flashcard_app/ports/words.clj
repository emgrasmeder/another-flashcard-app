(ns another-flashcard-app.ports.words
  (:require [clojure.data.csv :as csv]
            [clojure.java.io :as io]))

(defn csv->maps [csv-data]
  (map zipmap
       (->> (first csv-data)                                ;; First row is the header
            (map keyword)                                   ;; Drop if you want string keys instead
            repeat)
       (rest csv-data)))



(defn fetch-from
  "Returns a clojure map from csv file"
  [filename]
  (-> filename
      io/resource
      io/reader
      csv/read-csv
      csv->maps))