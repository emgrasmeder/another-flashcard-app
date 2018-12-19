### This file is deprecated

module Flashy

using Dates

io = open("log.txt", "w+")

include("functions.jl")

initialize()

function parseinput(card)
  in = chomp(readline()) 
  if in == "q"
    quit()
  elseif in == "y"
	 @info(now(), status="correct", language_from="english", language_to="hebrew", entry=card)
  elseif in == "n"
	 @info(now(), status="incorrect", language_from="english", language_to="hebrew", entry=card)
  elseif in == "a"
    addcard()
  elseif in == "m"
    showmenu()
  end
end

function drawcard()
	card = randrecord(CSV.read("./resources/1000-biblical-hebrew-words.csv"))
	printlnate("Do you know the Hebrew word for $card?")
	return card
end

while true
  card = drawcard()
  parseinput(card)
end

end
