using CSV, DataFrames

function get_word()
  index = rand(1:nrow(cards))
  return [cards[1][index], cards[2][index]]
end

filepath = Base.ENV["HEBREW_WORD_LIST"]
function load(filename = "$(filepath)/1000-biblical-hebrew-words.csv")
    return DataFrame(CSV.read(filename))
end

cards = load()
