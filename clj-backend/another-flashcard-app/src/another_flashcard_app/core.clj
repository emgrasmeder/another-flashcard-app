(ns another-flashcard-app.core
  (:require [clojure.string :as str]))


(defn in?
  "Returns true if element, exactly as is, is found in collection."
  [elem coll]
  (boolean (some #{elem} coll)))

(defn search [entries query]
  (filter (fn [m] (in? query (vals m))) entries))
