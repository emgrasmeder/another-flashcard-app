(ns another-flashcard-app.ports.words-test
  (:require [clojure.test :refer :all]
            [another-flashcard-app.ports.words :as words]
            [clojure.java.io :as io])
  (:import (java.util UUID)))


(deftest fetch-from-test
  (testing "should fetch a word"
    (let [word (words/fetch-from "test-words.csv")
          expected-words [{:id "123" :english "hello" :hebrew "shalom"}
                          {:id "456" :english "goodbye" :hebrew "shalom"}]]
      (is (= word expected-words)))))

(deftest fetch-from-test
  (testing "should fetch a word"
    (let [word (words/fetch-from "test-words.csv")
          expected-words [{:id "123" :english "hello" :hebrew "shalom"}
                          {:id "456" :english "goodbye" :hebrew "shalom"}]]
      (is (= word expected-words)))))


(deftest csv->maps-test
  (testing "should convert csv to maps"
    (let [input-arrays [["key" "value"]
                        ["hello" "world"]
                        ["goodnight" "moon"]]
          expected-maps [{:key   "hello"
                          :value "world"}
                         {:key   "goodnight"
                          :value "moon"}]]
      (is (= expected-maps (words/csv->maps input-arrays))))))

(deftest insert-word-in-test
  (testing "shouldn't blow up"
    (io/delete-file "/tmp/foo")
    (let [id (UUID/randomUUID)]
      (words/insert-word-in [(str id), "hello", "world"] "/tmp/foo")
      (is (= (format "%s,hello,world\n" id) (slurp "/tmp/foo"))))))
