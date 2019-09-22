(ns another-flashcard-app.core-test
  (:require [clojure.test :refer :all])
  (:require [another-flashcard-app.core :as core]))

(deftest search-test
  (testing "should filter words for query"
    (let [input-maps [{:some-key "val1" :some-extra-key "still here"}
                      {:some-key "val2"}
                      {:some-key "not-found"}]]
      (is (= (core/search input-maps "val1") [{:some-key "val1" :some-extra-key "still here"}])))))

(deftest match?-test
  (testing "should return true if words are sorta similar"
    (is (= true (core/match? "val1" "value 1")))
    (is (= false (core/match? "hello world" "value 2")))))
