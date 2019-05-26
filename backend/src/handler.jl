using Joseki, JSON, HTTP

include("cards.jl")

function card(req::HTTP.Request)
  thing = get_word()
  json_responder(req, thing)
end

function feedback(req::HTTP.Request)
    try
        response = String(req.body)
        println("Writing response ", response, "to log.ndjson")
        open("log.ndjson", "a") do file
            write(file, "$response\n" )
        end
    catch err
        println("Logging an error! ", err)
        return error_responder(req, "Expected JSON request body")
    end
    json_responder(req, "")
end

function frequencyFeedback(req::HTTP.Request)
    try
        response = JSON.parse(JSON.json(String(req.body)))
        wordId = JSON.parse(response)["wordId"]
        tomorrow = Dates.today() + Dates.Day(1)
        println("Removing card '$wordId' from draw pile")
        open("resources/preferences.csv", "a") do file
          write(file, "$wordId,$tomorrow\n" )
        end
    catch err
        println("Logging an error! ", err)
        return error_responder(req, "Expected JSON request body")
    end
    json_responder(req, "")
end

function search(req::HTTP.Request)
    try
      query = HTTP.queryparams(HTTP.URI(req.target))["q"]
      println("Searching cards for term:", query)
      json_responder(req,  JSONstringify(search(query)))
    catch err
        println("Logging an error! ", err)
        return error_responder(req, "Expected JSON request body")
    end
end

function response(req::HTTP.Request)
    body = try
        body_as_dict(req)
    catch err
        return error_responder(req, "Expected JSON request body")
    end

    thing = get_word()
    json_responder(req, thing)
end

endpoints = [
    (card, "GET", "/card"),
    (feedback, "POST", "/feedback"),
    (frequencyFeedback, "POST", "/feedback/frequency"),
    (search, "GET", "/search"),
    (req -> req.response, "OPTIONS", "*")
]
s = Joseki.router(endpoints)

println("Ready to serve on 127.0.0.1:8000")
HTTP.serve(s, "127.0.0.1", 8000; verbose=false)
