export deal

function response(input = "")
  return "
    <!DOCTYPE html>
    <html>

    <head>
      <meta charset=\"utf-8\">
    </head>

    <body>
    <font size=\"22\">Still needs formatting: $input</font>
    </body>

    </html>
  "
end

function deal()
  index = rand(1:nrow(cards))
  card = [cards[1][index], cards[2][index]]
  return response(card)
end


function load(filename = "/app/resources/1000-biblical-hebrew-words.csv")
    return CSV.read(filename)
end

cards = load()