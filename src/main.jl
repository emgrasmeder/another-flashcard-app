module Flashy

include("functions.jl")


initialize()

while true
  println("This is where we'd show a card. Enter 'q' to quit.")
  if chomp(readline()) == "q"
    println("Thanks for playing!")
    break
  end
end

end
