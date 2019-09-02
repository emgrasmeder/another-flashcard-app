(ns another-flashcard-app.adapters.words-test
  (:require [clojure.test :refer :all]
            [another-flashcard-app.adapters.words :as words]
            [cheshire.core :as cheshire]
            [mock-clj.core :as mock-clj]))

(deftest rand-word-test
  (testing "should return a word from a list"
    (let [word (words/rand-word)]
      (is (= (keys word) [:id :english :hebrew])))))

(deftest search-test
  (testing "should return words from the list which match query"
    (let [word (words/rand-word)]
      (is (= (keys word) [:id :english :hebrew])))))
