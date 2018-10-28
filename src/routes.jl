using Mux

default = "<h1>Hello World</h1>"

@app test = (
  Mux.defaults,
  page("/", respond(default)),
  page("/about", respond("<h1>About Me</h1>")),
  Mux.notfound())

serve(test)
Base.JLOptions().isinteractive == 0 && wait()