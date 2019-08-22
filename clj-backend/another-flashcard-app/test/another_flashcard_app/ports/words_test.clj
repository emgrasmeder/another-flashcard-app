(ns another-flashcard-app.ports.words-test
  (:require [clojure.test :refer :all])
  (:require [another-flashcard-app.ports.words :as words]
            [cheshire.core :as cheshire]))


(deftest fetch-from-test
  (testing "should fetch a word"
    (let [word (words/fetch-from "test-words.csv")
          expected-words [{:id "123" :english "hello" :hebrew "shalom"}
                          {:id "456" :english "goodbye" :hebrew "shalom"}]]
      (is (= word expected-words)))))
