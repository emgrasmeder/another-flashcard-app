using Mux
using Logging
using Dates

include("functions.jl")
include("cards.jl")
io = open("log.txt", "w+")

global_logger(SimpleLogger(io))

default = "<h1>Hello World</h1>"

@app test = (
  Mux.defaults,
  page("/", respond(default)),
  page("/cards", _ -> deal()),
  page("/about", respond("This is just Another Flashcard App")),
  Mux.notfound())

serve(test)
Base.JLOptions().isinteractive == 0 && wait()





# initialize()

#@info(now(), status="incorrect", language_from="english", language_to="hebrew", entry=card)


card = randrecord()