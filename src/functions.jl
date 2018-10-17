using CSV
using DataFrames

export initialize, one, cardpick, quit, addcard

function quit()
  println("Thanks for playing!")  
  exit()
end

function addcard()
  println("=== Add a new card ===")
  println("Enter the word in English that you'd like to add")
  english = chomp(readline()) 
  println("Enter the Hebrew word you'd like to add")
  hebrew = chomp(readline()) 
  println("=== Adding card to pile ===")
  writeline(english, hebrew)
end

function initialize()
  println("Welcome!")
  println("\n")
  println("You're using Hebrew and English flashcards. Press \"m\" to see the menu")
end


function dumpwords()
  for row in CSV.File("./words.csv")
    println("id=$(row.id), English=$(row.english), Hebrew=$(row.hebrew)")
  end
end

one() = return 1

function randrecord(df)
  return df[[rand(1:nrow(df))],:]
end

function writeline(english, hebrew)
  CSV.write("./resources/words.csv", DataFrame([english hebrew]), append=true)
end
