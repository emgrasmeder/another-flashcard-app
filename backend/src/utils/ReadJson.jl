using Lazy
using JSON
using DataFrames
using DataFramesMeta


function readFile(filename)
  df = DataFrame()
  open(filename, "r") do f
    for ln in eachline(f)
      append!(df, JSON.parse(ln) |> DataFrame)
    end
  end
  return df
end

function encodeDisplayedLanguage(df)
  @byrow! df begin
    @newcol codedDisplayedLanguage::Array{Int8}
    :codedDisplayedLanguage = :displayedLanguage .== "hebrew" ? 0 : 1
  end
end

function encodeIsKnown(df)
  @byrow! df begin
    @newcol codedIsKnown::Array{Int8}
    :codedIsKnown = :isKnown .== false ? 0 : 1
  end
end