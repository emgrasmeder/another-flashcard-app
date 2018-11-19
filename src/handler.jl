using Joseki, JSON, HTTP

function pow(req::HTTP.Request)
    j = HTTP.queryparams(HTTP.URI(req.target))
    has_all_required_keys(["x", "y"], j) || return error_responder(req, "You need to specify values for x and y!")
    x = parse(Float32, j["x"])
    y = parse(Float32, j["y"])
    json_responder(req, x^y)
end

function cards(req::HTTP.Request)
    json_responder(req, "WORD")
end


# This function takes two numbers n and k from a JSON-encoded request
# body and returns binomial(n, k)
function bin(req::HTTP.Request)
    j = try
        body_as_dict(req)
    catch err
        return error_responder(req, "I was expecting a json request body!")
    end
    has_all_required_keys(["n", "k"], j) || return error_responder(req, "You need to specify values for n and k!")
    json_responder(req, binomial(j["n"],j["k"]))
end

endpoints = [
    (pow, "GET", "/pow"),
    (bin, "POST", "/bin"),
    (cards, "GET", "/cards"),
    (req -> req.response, "OPTIONS", "*")
]
s = Joseki.server(endpoints)

HTTP.serve(s, "127.0.0.1", 8000; verbose=false)