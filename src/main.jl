using CSV
println("Welcome!")
println("\n")
println("You're using Hebrew and English flashcards. Would you like to continue? [Y/n]")

if !(chomp(readline()) in ["", "y", "Y"])
    exit()
end

println("Okay, let's do it")
# for row in CSV.File("./words.csv")
#    println("id=$(row.id), English=$(row.english), Hebrew=$(row.hebrew)")
# end

