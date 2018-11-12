(ns reagent-frontend.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [reagent.core :as reagent :refer [atom]]
            [reagent.session :as session]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]
            [reitit.frontend :as reitit]
            [clerk.core :as clerk]
            [accountant.core :as accountant]))

;; -------------------------
;; Routes


(def router
  (reitit/router
    [["/" :index]
     ["/study" :study]
     ["/about" :about]]))

(defn path-for [route & [params]]
  (if params
    (:path (reitit/match-by-name router route params))
    (:path (reitit/match-by-name router route))))

(path-for :about)
;; -------------------------
;; Page components

(defn home-page []
  (fn []
    [:span.main
     [:h1 "It's Another Flashcard App"]
     [:ul
      [:li [:a {:href (path-for :study)} "Study!"]]]]))



(defn study-page []
  (fn []
    [:span.main
     [:h1 "Let's format this and learn some Hebrew"]
     [:ul (go (let [query-options {:with-credentials? false}
                    response (<! (http/get "http://another-flashcard-app:8000/cards" query-options))]
                (prn (:status response))
                (prn (map :login (:body response)))))]]))


(defn about-page []
  (fn [] [:span.main
          [:h1 "It's just Another Flashcard App"]]))


;; -------------------------
;; Translate routes -> page components

(defn page-for [route]
  (case route
    :index #'home-page
    :about #'about-page
    :study #'study-page))


;; -------------------------
;; Page mounting component

(defn current-page []
  (fn []
    (let [page (:current-page (session/get :route))]
      [:div
       [:header
        [:p [:a {:href (path-for :index)} "Home"] " | "
         [:a {:href (path-for :about)} "About reagent-frontend"]]]
       [page]
       [:footer
        [:p "reagent-frontend was generatated by the "
         [:a {:href "https://github.com/reagent-project/reagent-template"} "Reagent Template"] "."]]])))

;; -------------------------
;; Initialize app

(defn mount-root []
  (reagent/render [current-page] (.getElementById js/document "app")))

(defn init! []
  (clerk/initialize!)
  (accountant/configure-navigation!
    {:nav-handler
     (fn [path]
       (let [match (reitit/match-by-path router path)
             current-page (:name (:data match))
             route-params (:path-params match)]
         (reagent/after-render clerk/after-render!)
         (session/put! :route {:current-page (page-for current-page)
                               :route-params route-params})
         (clerk/navigate-page! path)
         ))
     :path-exists?
     (fn [path]
       (boolean (reitit/match-by-path router path)))})
  (accountant/dispatch-current!)
  (mount-root))
