(ns another-flashcard-app.core
  (:require [clj-fuzzy.metrics :as metrics]))


(defn in?
  "Returns true if test, exactly as is, matches elem"
  [test elem]
  (boolean (some #{test} elem)))

(defn match?
  "Returns true if test has is a .5 match to elem using Dice's algorithm"
  [test elem]
  (>= (metrics/dice test elem) 0.5))

(defn search [entries query]
  (filter (fn [m] (in? query (vals m))) entries))

(defn search-fuzzy [entries query]
  (filter (fn [m] (match? query (vals m))) entries))
