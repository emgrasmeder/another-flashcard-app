(ns another-flashcard-app.core
  (:require [clojure.string :as str]))


(defn in? [elem coll] (boolean (some #{elem} coll)))

(defn search [entries query]
  (filter (fn [m] (in? query (vals m))) entries))
