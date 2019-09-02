(ns another-flashcard-app.service-test
  (:require [clojure.test :refer :all]
            [io.pedestal.test :refer :all]
            [io.pedestal.http :as bootstrap]
            [another-flashcard-app.service :as service]
            [another-flashcard-app.utils :as test-utils]))

(def service
  (::bootstrap/service-fn (bootstrap/create-servlet service/service)))

(deftest card-test
  (is (= (keys (test-utils/response-body (response-for service :get "/card")))
         [:id :english :hebrew])))

(deftest search-test
  (is (= (test-utils/response-body (response-for service :get "/search?q=to run"))
         [{:english "to run"
           :hebrew  "לָרוּץ"
           :id      "1A81A7DE-027A-40B9-854D-F313E6C0F8FC"}])))