(ns another-flashcard-app.pages
  (:require [io.pedestal.http :as http]
            [io.pedestal.http.route :as route]
            [io.pedestal.http.body-params :as body-params]
            [ring.util.response :as ring-resp]
            [another-flashcard-app.ports.words :as words]))

(defn card [request]
  (ring-resp/response (words/fetch)))

(defn feedback [request]
  (println (format "I should log %s to log.ndjson" (:body request)))
  )

;(defn frequency [request]
;  (let [response (:body request)
;        word-id (:wordId response)
;        tomorrow (get-tomorrow)]
;    (println "I should write the word-id and tomorrows date to a file so we ignore the word word until %s" tomorrow)))

;(defn search [request]
;  (let [query-param (get-param)]
;    (search query-param)))
;
(def common-interceptors [(body-params/body-params) http/html-body])


;; Tabular routes
(def routes #{["/card" :get (conj common-interceptors `card)]
              ["/feedback" :post (conj common-interceptors `feedback)]
              ;["/feedback/frequency" :post (conj common-interceptors `frequency)]
              ;["/search" :get (conj common-interceptors `search)]
              })

