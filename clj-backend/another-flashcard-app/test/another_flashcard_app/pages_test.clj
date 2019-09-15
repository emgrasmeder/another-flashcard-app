(ns another-flashcard-app.pages-test
  (:require [clojure.test :refer :all]
            [io.pedestal.test :refer :all]
            [io.pedestal.http :as bootstrap]
            [another-flashcard-app.service :as service]
            [another-flashcard-app.utils :as test-utils]
            [cheshire.core :as cheshire]
            [mock-clj.core :as mock-clj]
            [another-flashcard-app.adapters.words :as words]))

(def service
  (::bootstrap/service-fn (bootstrap/create-servlet service/service)))

(deftest feedback-test
  (mock-clj/with-mock
    [words/write-feedback nil]
    (let [response (response-for service
                                 :post "/feedback"
                                 :headers {"Content-Type" "application/json"}
                                 :body (cheshire/generate-string {:displayedLanguage "hebrew"
                                                                  :isKnown           true
                                                                  :timestamp         1568567432
                                                                  :wordId            "1A81A7DE-027A-40B9-854D-F313E6C0F8FC"}))]
      (is (= 201 (:status response)))
      (is (= "" (:body response)))
      (is (= {:displayedLanguage "hebrew"
              :isKnown           true
              :timestamp         1568567432
              :wordId            "1A81A7DE-027A-40B9-854D-F313E6C0F8FC"} (first (mock-clj/last-call words/write-feedback)))))))

(deftest card-test
  (is (= (keys (test-utils/response-body (response-for service :get "/card")))
         [:id :english :hebrew])))

(deftest search-test
  (is (= (test-utils/response-body (response-for service :get "/search?q=to run"))
         [{:english "to run"
           :hebrew  "לָרוּץ"
           :id      "1A81A7DE-027A-40B9-854D-F313E6C0F8FC"}])))
