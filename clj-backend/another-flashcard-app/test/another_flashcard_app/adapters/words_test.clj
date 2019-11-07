(ns another-flashcard-app.adapters.words-test
  (:require [clojure.test :refer :all]
            [another-flashcard-app.adapters.words :as words]
            [another-flashcard-app.core :as core]))

(deftest rand-word-test
  (testing "should return a word from a list"
    (let [word (words/rand-word)]
      (is (= (keys word) [:id :english :hebrew])))))

(deftest search-test
  (testing "should return words from the list which match query"
    (let [word (words/rand-word)]
      (is (= (keys word) [:id :english :hebrew])))))

(deftest insert-word-test
  (testing "should assign a new uuid to record"
    (let [actual-output (words/insert-word {:hello "world"})]
      (is (not (nil? actual-output))))))

(deftest get-headers-test
  (testing "should return the first line of the file"
    (is (= [:id :english :hebrew] (words/get-headers "words.csv")))))

(deftest map->csv-test
  (testing "should convert map to csv"
    (let [input-map {:id   "123"
                     :english "good"
                     :hebrew "tov"}
          expected-csv-record ["123" "good" "tov"]]
      (is (= expected-csv-record (core/map->csv input-map [:id :english :hebrew]))))))
