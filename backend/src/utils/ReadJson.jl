using Lazy
using JSON
using DataFrames

df = DataFrame()
function readFile(filename)
  open(filename, "r") do f
    for ln in eachline(f)
      append!(df, JSON.parse(ln) |> DataFrame)
    end
  end
  return df
end