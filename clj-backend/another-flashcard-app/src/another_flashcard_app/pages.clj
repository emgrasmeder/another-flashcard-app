(ns another-flashcard-app.pages
  (:require [io.pedestal.http :as http]
    ;[io.pedestal.http.route :as route]
            [io.pedestal.http.body-params :as body-params]
            [ring.util.response :as ring-resp]
            [another-flashcard-app.adapters.words :as words]
            [cheshire.core :as cheshire]))

(defn home [request]
  (ring-resp/response "nothing to see here"))

(defn card [request]
  (ring-resp/response (cheshire/generate-string (words/rand-word))))

(defn search [request]
  (-> request
      :query-params
      :q
      words/search
      cheshire/generate-string
      ring-resp/response))

(defn feedback [request]
  (-> request
      :json-params
      words/write-feedback)
  (ring-resp/created "/feedback"))

(defn insert [request]
  (-> request
      :json-params
      words/insert-word)
  (ring-resp/created "/insert"))

;(defn frequency [request]
;  (let [response (:body request)
;        word-id (:wordId response)
;        tomorrow (get-tomorrow)]
;    (println "I should write the word-id and tomorrows date to a file so we ignore the word word until %s" tomorrow)))

;(defn search [request]
;  (let [query-param (get-param)]
;    (search query-param)))


(def common-interceptors [(body-params/body-params) http/html-body])


;; Tabular routes
(def routes #{["/" :get (conj common-interceptors `home)]
              ["/card" :get (conj common-interceptors `card)]
              ["/search" :get (conj common-interceptors `search)]
              ["/feedback" :post (conj common-interceptors `feedback)]
              ["/insert" :put (conj common-interceptors `insert)]
              ;["/feedback/frequency" :post (conj common-interceptors `frequency)]
              ;["/search" :get (conj common-interceptors `search)]
              })

