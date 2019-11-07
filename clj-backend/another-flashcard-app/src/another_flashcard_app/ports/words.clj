(ns another-flashcard-app.ports.words
  (:require [clojure.data.csv :as csv]
            [clojure.java.io :as io]))

(defn csv->maps [csv-data]
  (map zipmap
       (->> (first csv-data)                                ;; First row is the header
            (map keyword)                                   ;; Drop if you want string keys instead
            repeat)
       (rest csv-data)))

(defn fetch-rows-from
  "Returns a clojure map from csv file"
  [filename]
  (-> filename
      io/resource
      io/reader
      csv/read-csv))

(defn fetch-from
  "Returns a clojure map from csv file"
  [filename]
  (-> filename
      fetch-rows-from
      csv->maps))

(defn insert-word-in
  [new-record file]
  (with-open [w (clojure.java.io/writer file :append true)]
    (doseq [line (interpose "," new-record)]
      (.write w line))
    (.newLine w)))