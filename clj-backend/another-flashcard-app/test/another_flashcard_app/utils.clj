(ns another-flashcard-app.utils
  (:require [clojure.test :refer :all]
            [cheshire.core :as cheshire]))

(defn response-body [res]
  (cheshire/parse-string (:body res) true))
