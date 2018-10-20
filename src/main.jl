module Flashy

using Logging
io = open("log.txt", "w+")
logger = SimpleLogger(io)
global_logger(logger)
@info("a global log message")

include("functions.jl")

initialize()

function parseinput(card)
  in = chomp(readline()) 
  if in == "q"
    quit()
	elseif in == "y"
	 @info("CORRECT: English->Hebrew for card: $card") 
  elseif in == "a"
    addcard()
  elseif in == "m"
    showmenu()
  end
end

function drawcard()
	card = randrecord(CSV.read("./resources/words.csv"))
	println("Do you know the Hebrew word for $card?")
	return card
end

while true
  card = drawcard()
  parseinput(card)
end

end
