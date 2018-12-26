using CSV, DataFrames, Logging

io = open("word-feedback.txt", "w+")
global_logger(SimpleLogger(io))

function JSONstringify(d::Dict)
    return String(JSON.json(d))
end

function get_word()
  randn = rand(1:nrow(cards))
  body = Dict(
    "id" => cards[1][randn],
    "english" => cards[2][randn],
    "hebrew" => cards[3][randn]
  )
  return JSONstringify(body)
end

function process_feedback(feedback)

end

filepath = get(ENV, "HEBREW_WORD_LIST", "./resources/")
function load(filename = "$(filepath)/1000-biblical-hebrew-words.csv")
    return DataFrame(CSV.read(filename))
end

cards = load()

function addUUIDs(df)
    df[:id] = map((x) -> uuid4(), 1:nrow(df))
end
