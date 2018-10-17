module Flashy

include("functions.jl")


initialize()

function parseinput()
  in = chomp(readline()) 
  if in == "q"
    quit()
  elseif in == "a"
    addcard()
  end
end

while true
  println("This is where we'd show a card. Enter 'q' to quit.")
  parseinput()
end

end
