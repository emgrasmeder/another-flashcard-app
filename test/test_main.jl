# take a look at: http://abelsiqueira.github.io/blog/test-driven-development-in-julia/
# and https://github.com/wookay/Jive.jl/blob/master/test/jive/mockup/mockup.jl
using Test
using DataFrames

include("../src/functions.jl")

@testset "randrecord returns an row of dataframe" begin
  df = DataFrame([collect(1:3), collect(4:6) ], [:A, :B])
  @test convert(Array, randrecord(df)) ∈ [[1 4], [2 5], [3 6]]
end;

