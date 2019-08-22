(ns another-flashcard-app.adapters.words-test
  (:require [clojure.test :refer :all]
            [another-flashcard-app.adapters.words :as words]
            [cheshire.core :as cheshire]))

(deftest rand-word-test
  (testing "should return a word from a list"
    (mock-clj/with-mock
      [rand-nth first]
      (let [word (words/rand-word "test-words.csv")]
        (is (or (= word (cheshire/generate-string {:map2key1 "val"}))
                (= word (cheshire/generate-string {:map1key1 "val"}))))))))
