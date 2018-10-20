using CSV
using DataFrames

export initialize, one, cardpick, quit, addcard, showmenu, randrecord

function initialize()
  println("Welcome!")
  println("You're using Hebrew and English flashcards. Reminder: press \"m\" at any time to see the menu.")
end

function showmenu()
  println("Another Flashcard App\n")
  println("This flashcard app learns how you learn (or will someday).\n")
  println("Basic Command Shortcuts:")
  println("  a          Add card")
  println("  m          See this menu")
  println("  q          Quit")
end

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
  CSV.write("./resources/words.csv", DataFrame([english hebrew]), append=true)
end



function dumpwords()
  for row in CSV.File("./words.csv")
    println("id=$(row.id), English=$(row.english), Hebrew=$(row.hebrew)")
  end
end

function randrecord(df)
  randindex = rand(1:nrow(df))
  return [df[1][randindex], df[2][randindex]]
end
