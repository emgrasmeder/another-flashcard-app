using CSV, DataFrames, Logging, Query

function JSONstringify(d::Dict)
  # TODO: is casting as string necessary?
  return String(JSON.json(d))
end

function JSONstringify(df::DataFrame)
  JSON.json(map(row -> Dict(colname => df[row,colname] for colname in names(df)), 1:nrow(df)))
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

filepath = get(ENV, "HEBREW_WORD_LIST_PATH", "./resources")
filename = get(ENV, "HEBREW_WORD_LIST_FILE", "basic-words1.csv")
function load(filename = "$(filepath)/$(filename)")
  println("loading cards from $(filepath)/$(filename)")
  return DataFrame(CSV.read(filename))
end

cards = load()

function addUUIDs(df)
    df[:id] = map((x) -> uuid4(), 1:nrow(df))
end

function search(term, df=cards)
  filter(row -> occursin(term, row.english) ||
                occursin(term, row.hebrew), df)
end
