(ns ^:figwheel-no-load reagent-frontend.dev
  (:require
    [reagent-frontend.core :as core]
    [devtools.core :as devtools]))

(devtools/install!)

(enable-console-print!)

(core/init!)
